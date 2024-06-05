import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import { MongoClient } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { getQuery } from "https://deno.land/x/oak@v11.1.0/helpers.ts";
import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { RouterContext } from "https://deno.land/x/oak@v11.1.0/router.ts";

await config({ export: true, allowEmptyValues: true });

const client = new MongoClient();

await client.connect(
  `mongodb+srv://${Deno.env.get("MONGO_USR")}:${Deno.env.get(
    "MONGO_PWD"
  )}@${Deno.env.get("MONGO_URI")}/?authMechanism=SCRAM-SHA-1`
);

const db = client.database(Deno.env.get("DB_NAME"));
console.info(`MongoDB ${db.name} connected`);

const usersCollection = db.collection("Users");
const tablesCollection = db.collection("Tables");

type User = {
  username: string;
  password: string;
  email: string;
  table: Table;
};

type Column = {
  name: string;
  type: string;
};

type Table = {
  username: string;
  columns: Column[];
  rows: string[][];
};

type PostUsersContext = RouterContext<
  "/addUser",
  Record<string | number, string | undefined>,
  Record<string, any>
>;

export const addUser = async (context: PostUsersContext) => {
  try {
    const result = context.request.body({ type: "json" });
    const value = await result.value;

    const comprobarUser = await usersCollection.findOne({
      username: value.username,
    });

    if (comprobarUser) {
      context.response.body = "El usuario ya existe";
      context.response.status = 400;
      return;
    }

    const user: Partial<User> = {
      username: value.username,
      password: value.password,
      email: value.email,
      table: value.table,
    };

    await usersCollection.insertOne(user);

    context.response.body = { user };
    context.response.status = 200;
  } catch (error) {
    context.response.status = 500;
  }
};

type PostLogInUsersContext = RouterContext<
  "/LogInJSON",
  Record<string | number, string | undefined>,
  Record<string, any>
>;

export const logInJSON = async (context: PostLogInUsersContext) => {
  try {
    const result = context.request.body({ type: "json" });
    const value = await result.value;

    const user = await usersCollection.findOne({
      username: value.username,
      password: value.password,
    });

    if (!user) {
      context.response.body = "El usuario no existe";
      context.response.status = 400;
      return;
    } else {
      context.response.body = "El usuario existe";
      context.response.status = 200;
      return;
    }
  } catch (error) {
    context.response.status = 500;
  }
};

type PostLogInUsersWithParametrosContext = RouterContext<
  "/LogInParametros",
  Record<string | number, string | undefined>,
  Record<string, any>
>;

export const logInWithParametros = async (
  context: PostLogInUsersWithParametrosContext
) => {
  try {
    const params = getQuery(context, { mergeParams: true });

    if (!params.username || !params.password) {
      context.response.body =
        "Falta el campo username o password por completar";
      context.response.status = 400;
      return;
    }

    const user = await usersCollection.findOne({
      username: params.username,
      password: params.password,
    });

    if (!user) {
      context.response.body = "El usuario no existe";
      context.response.status = 400;
      return;
    } else {
      context.response.body = "El usuario existe";
      context.response.status = 200;
      return;
    }
  } catch (error) {
    context.response.status = 500;
  }
};

type PostInformationTableContext = RouterContext<
  "/addInformationTable",
  Record<string | number, string | undefined>,
  Record<string, any>
>;

export const addInformationTable = async (
  context: PostInformationTableContext
) => {
  try {
    const result = context.request.body({ type: "json" });
    const value = await result.value;

    const table: Partial<Table> = {
      username: value.username,
      columns: value.columns.map((column: any) => {
        return { name: column.name, type: column.type };
      }),
      rows: value.rows.map((row: any) => {
        return row;
      }),
    };

    const tablaExistente = await tablesCollection.findOne({
      username: value.username,
    });

    if (tablaExistente) {
      await tablesCollection.updateOne(
        { username: value.username },
        { $set: { columns: table.columns, rows: table.rows } }
      );

      context.response.body = { table };
      context.response.status = 200;
      return;
    }

    await tablesCollection.insertOne(table);

    context.response.body = { table };
    context.response.status = 200;
  } catch (error) {
    context.response.status = 500;
  }
};

type SaveTableContext = RouterContext<
  "/saveTable",
  Record<string | number, string | undefined>,
  Record<string, any>
>;

export const saveTable = async (context: SaveTableContext) => {
  try {
    const result = context.request.body({ type: "json" });
    const value = await result.value;

    const table: Partial<Table> = {
      username: value.username,
      columns: value.columns.map((column: any) => {
        return { name: column.name, type: column.type };
      }),
      rows: value.rows.map((row: any) => {
        return row;
      }),
    };

    const tablaExistente = await tablesCollection.findOne({
      username: value.username,
    });

    if (tablaExistente) {
      await tablesCollection.updateOne(
        { username: value.username },
        { $set: { columns: table.columns, rows: table.rows } }
      );

      context.response.body = { table };
      context.response.status = 200;
      return;
    }

    await tablesCollection.insertOne(table);

    context.response.body = { table };
    context.response.status = 200;
  } catch (error) {
    context.response.status = 500;
  }
};

type LoadTableContext = RouterContext<
  "/loadTable/:username",
  {
    username: string;
  } & Record<string | number, string | undefined>,
  Record<string, any>
>;

export const loadTable = async (context: LoadTableContext) => {
  try {
    if (!context.params.username) {
      context.response.body = "No hay usuario";
      context.response.status = 400;
      return;
    }

    const findTable = await tablesCollection.findOne({
      username: context.params.username,
    });

    if (!findTable) {
      context.response.body = "No existe la tabla";
      context.response.status = 400;
      return;
    } else {
      context.response.body = findTable;
      context.response.status = 200;
      return;
    }
  } catch (error) {
    context.response.status = 500;
  }
};

const router = new Router();
router
  .post("/addUser", addUser)
  .post("/LogInJSON", logInJSON)
  .post("/LogInParametros", logInWithParametros)
  .post("/addInformationTable", addInformationTable)
  .post("/saveTable", saveTable)
  .get("/loadTable/:username", loadTable);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8080 });
