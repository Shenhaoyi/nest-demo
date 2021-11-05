// This file should exist in `src/models/users`
import { parse } from "json2csv";
import { Injectable, NotFoundException } from "@nestjs/common";
import {
  getFile,
  createFile,
  checkIfFileOrDirectoryExists,
} from "../../helper/storage.helper";

/**
 * Service dealing with User based operations.
 *
 * @class
 */
@Injectable()
export class UsersService {


  /**
   * Creates a CSV file with users data
   *
   * @returns {Promise<string>}
   */
  // async exportUserDataToCSV(): Promise<string> {
  //   return await this.getMany() // Some function that gets users data.
  //     .then(async (users) => {
  //       const [csvData, csvFields] =
  //         this.transformUsersDataForCSV(users); // Some function that returns you csv data & fields.

  //       if (!csvData || !csvFields) {
  //         return Promise.reject("Unable to transform users data for CSV.");
  //       }

  //       const csv = parse(csvData, { fields: csvFields });

  //       const filePath = `storage/app/exports/users`;
  //       const fileName = `users-${new Date().toISOString()}.csv`;

  //       await createFile(filePath, fileName, csv);

  //       return Promise.resolve(fileName);
  //     })
  //     .catch((error) => Promise.reject(error));
  // }

  /**
   * Gets an exported CSV file
   *
   * @param {string} filename
   *
   * @returns {Promise<string>}
   */
  async getExportedUserCSV(filename: string): Promise<string> {
    const filePath = `${process.cwd()}/${filename}`;
    if (!checkIfFileOrDirectoryExists(filePath)) {
      throw new NotFoundException('Users export not found.');
    }
    const file = await getFile(filePath, 'utf8');
    const a = file.toString();

    return a;
  }
}
