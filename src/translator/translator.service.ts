import { Injectable } from '@nestjs/common';
import { google, sheets_v4 } from 'googleapis';
import { resolve } from 'path';
import { GoogleAuth } from 'googleapis-common';
@Injectable()
export class TranslatorService {
  googleAuth(): GoogleAuth {
    const configPath = resolve(__dirname, '..', 'config');
    return new google.auth.GoogleAuth({
      keyFile: `${configPath}/google.credentials.json`,
      scopes: process.env.SCOPES
    });
  }

  async googleSheetsClient(): Promise<sheets_v4.Sheets> {
    const auth: GoogleAuth = await this.googleAuth();
    const client = await auth.getClient();
    return google.sheets({ version: 'v4', auth: client });
  }

  async metadata() {
    try {
      const googleSheets = await this.googleSheetsClient();
      const metaData = await googleSheets.spreadsheets.get({
        auth: this.googleAuth(),
        spreadsheetId: process.env.SPREADSHEET_ID
      });
      return metaData;
    } catch (error) {
      console.error('ERROR GETTING METADATA', error);
    }
  }
}
