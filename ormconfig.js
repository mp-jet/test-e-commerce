import { join } from "path";

export default {
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "opn_services_user",
  "password": "JA?=b2EfMhd.684g",
  "database": "opn_services",
  "entities": [join(__dirname, "**/**.entity{.ts,.js}")],
  "synchronize": true
}
