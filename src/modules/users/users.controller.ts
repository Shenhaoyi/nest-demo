// This file should exist in `src/models/users`
import { UsersService } from "./users.service";
import { Response as ExpressResponse } from "express";
import { Controller, Get, Header, Response } from "@nestjs/common";

/**
 * Controller dealing with user entity based operations.
 *
 * @class
 */
@Controller("users")
export class UsersController {
  /**
   * Create an instance of class.
   *
   * @constructs
   *
   * @param {UsersService} usersService
   */
  constructor(private readonly usersService: UsersService) { }

  /**
   * Exports a CSV & downloads it for users.
   *
   * @public
   * @async
   *
   * @returns {Promise<ExpressResponse>} Returns success response entity.
   */
  @Get("export-csv")
  // @Header('content-disposition', 'attachment; filename = "test.csv"')
  async export(@Response() res: ExpressResponse): Promise<ExpressResponse> {
    const fileName = 'test.csv'
    return await this.usersService.getExportedUserCSV(fileName).then((csvData) => {
      res.set("Content-Type", "text/csv");
      console.log('export-csv');
      return res.send(csvData);
    })
    // return await this.usersService.exportUserDataToCSV().then(
    //   async (fileName) =>
    //     await this.usersService.getExportedUserCSV(fileName).then((csvData) => {
    //       res.set("Content-Type", "text/csv");

    //       return res.send(csvData);
    //     })
    // );
  }
}
