module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    await db.collection('users', {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["email", "password", "role", "profile"],
          properties: {
            email: { bsonType: "string", description: "must be a string and is required" },
            password: { bsonType: "string", description: "hashed password required" },
            role: { enum: ["super_admin", "admin", "trainer", "member"], description: "user role" },
            profile: {
              bsonType: "object",
              properties: {
                firstName: { bsonType: "string" },
                lastName: { bsonType: "string" },
                phone: { bsonType: "string" },
                avatar: { bsonType: "string" },
                dateOfBirth: { bsonType: "date" },
                gender: { enum: ["male", "female", "other"] },
                address: {
                  bsonType: "object",
                  properties: {
                    street: { bsonType: "string" },
                    city: { bsonType: "string" },
                    state: { bsonType: "string" },
                    zipCode: { bsonType: "string" },
                    country: { bsonType: "string" }
                  }
                },
                emergencyContact: {
                  bsonType: "object",
                  properties: {
                    name: { bsonType: "string" },
                    phone: { bsonType: "string" },
                    relationship: { bsonType: "string" }
                  }
                }
              }
            },
            isActive: { bsonType: "bool" },
            lastLogin: { bsonType: "date" },
            createdAt: { bsonType: "date" },
            updatedAt: { bsonType: "date" }
          }
        }
      }
    });
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    await db.collection('users').drop();
  }
};
