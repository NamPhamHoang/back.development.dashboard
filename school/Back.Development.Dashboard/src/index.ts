if (process.env.NODE_ENV === "production") {
    require("module-alias/register");
    require("../dotenv.config");
  }
  import boot from "~@/boot/index";
  boot();
  