"use strict";
// This file is auto-generated, don't edit it
const Util = require("@alicloud/tea-util");
const dingtalknotable_1_0 = require("@alicloud/dingtalk/notable_1_0");
const OpenApi = require("@alicloud/openapi-client");
const Tea = require("@alicloud/tea-typescript");
const fs = require("fs");

const dingConfig = JSON.parse(fs.readFileSync("ding.json", "utf8"));

class Client {
  /**
   * 使用 Token 初始化账号Client
   * @return Client
   * @throws Exception
   */
  static createClient() {
    let config = new OpenApi.Config({});
    config.protocol = "https";
    config.regionId = "central";
    return new dingtalknotable_1_0.default(config);
  }

  static async getSheetRecords(client, sheetId) {
    let getRecordsHeaders = new dingtalknotable_1_0.GetRecordsHeaders({});
    getRecordsHeaders.xAcsDingtalkAccessToken = dingConfig.xAcsDingtalkAccessToken;
    let getRecordsRequest = new dingtalknotable_1_0.GetRecordsRequest({
      operatorId: dingConfig.operatorId,
      maxResults: 100,
    });
    
    try {
      const recordsResult = await client.getRecordsWithOptions(
        dingConfig.workbookId,
        sheetId,
        getRecordsRequest,
        getRecordsHeaders,
        new Util.RuntimeOptions({})
      );
      console.log(`Sheet ${sheetId} records:`, JSON.stringify(recordsResult, null, 2));
      return recordsResult;
    } catch (err) {
      console.error(`Error getting sheet ${sheetId} records:`, err);
    }
  }

  static async main() {
    let client = Client.createClient();
    let getAllSheetsHeaders = new dingtalknotable_1_0.GetAllSheetsHeaders({});
    getAllSheetsHeaders.xAcsDingtalkAccessToken = dingConfig.xAcsDingtalkAccessToken;
    let getAllSheetsRequest = new dingtalknotable_1_0.GetAllSheetsRequest({
      operatorId: dingConfig.operatorId,
    });
    try {
      const result = await client.getAllSheetsWithOptions(
        dingConfig.workbookId,
        getAllSheetsRequest,
        getAllSheetsHeaders,
        new Util.RuntimeOptions({})
      );
      console.log('Result type:', typeof result);
      console.log('Is Promise:', result instanceof Promise);
      console.log('Full result:', JSON.stringify(result, null, 2));
      
      if (result.body && result.body.value) {
        console.log('Found sheets:', result.body.value.length);
        for (const sheet of result.body.value) {
          console.log(`Getting records for sheet: ${sheet.name} (${sheet.id})`);
          await Client.getSheetRecords(client, sheet.id);
        }
      }
    } catch (err) {
      console.error(err);
      if (!Util.default.empty(err.code) && !Util.default.empty(err.message)) {
        // err 中含有 code 和 message 属性，可帮助开发定位问题
      }
    }
  }
}

exports.Client = Client;
Client.main(process.argv.slice(2));
