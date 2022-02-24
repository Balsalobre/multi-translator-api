import { Injectable } from '@nestjs/common';
import { google, sheets_v4 } from 'googleapis';
import { resolve } from 'path';
import { GoogleAuth } from 'googleapis-common';
import { CreateTranslationDto } from './dto/translator.dto';
@Injectable()
export class TranslatorService {
  private auth: GoogleAuth;
  private readonly spreadsheetId = process.env.SPREADSHEET_ID;

  constructor() {
    this.auth = this.googleAuthInstance;
  }

  get googleAuthInstance(): GoogleAuth {
    const configPath = resolve(__dirname, '..', 'config');
    return new google.auth.GoogleAuth({
      keyFile: `${configPath}/google.credentials.json`,
      scopes: process.env.SCOPES
    });
  }

  async googleSheetsClient(): Promise<sheets_v4.Sheets> {
    const client = await this.auth.getClient();
    return google.sheets({ version: 'v4', auth: client });
  }

  async metadata() {
    try {
      const client = await this.googleSheetsClient();
      // metadata
      return await client.spreadsheets.get({
        auth: this.auth,
        spreadsheetId: this.spreadsheetId
      });
    } catch (error) {
      console.error('ERROR GETTING METADATA', error);
    }
  }

  async traslations() {
    const client = await this.googleSheetsClient();
    const { data } = await client.spreadsheets.values.get({
      auth: this.auth,
      spreadsheetId: this.spreadsheetId,
      range: 'Sheet1'
    });
    return data;
  }

  async createTranslation(translation: CreateTranslationDto) {
    const { sourceLanguage, text } = translation;
    const client = await this.googleSheetsClient();
    const update = await client.spreadsheets.values.update({
      auth: this.auth,
      spreadsheetId: this.spreadsheetId,
      range: 'Sheet1!A1:B1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[`${sourceLanguage}`, `${text}`]]
      }
    });
    return update;
  }
}
