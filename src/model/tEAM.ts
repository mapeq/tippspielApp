/**
 * Tippspiel
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 0.0.1
 * Contact: apiteam@swagger.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface Team {
    MANNSCHAFT_ID?: number;
    NAME?: string;
    ICON?: string;
    tEAMCOLOR1?: string;
    tEAMCOLOR2?: string;
    FIFA_RANG?: number;
    ANZAHL_SIEGE?: number;
    ANZAHL_NIEDERLAGEN?: number;
    ANZAHL_UNENTSCHIEDEN?: number;
    TORVERHAELTNIS?: string;
    SATZSTATUS?: string;
    ACTIVE?: number;
}
