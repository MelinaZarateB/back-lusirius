import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Users = sequelize.define("Users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[a-zA-Z\s]+$/, // Permite letras y espacios
        len: {
          args: [2, 255],
          msg: "El nombre tiene que ser mínimo de dos caracteres",
        },
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[a-zA-Z\s]+$/, // Permite letras y espacios
        len: {
          args: [2, 255],
          msg: "El nombre tiene que ser mínimo de dos caracteres",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "El email tiene que ser un correo válido",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [6, 255],
          msg: "La contraseña tiene que tener mínimo 6 caracteres",
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[0-9+\-\s()]+$/,
      },
    },
    role: {
      type: DataTypes.ENUM("admin", "client"),
      defaultValue: "client",
    },
  });

  return Users;
};
