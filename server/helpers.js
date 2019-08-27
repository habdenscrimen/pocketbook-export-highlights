const sqliteJson = require('sqlite-json')
const util = require('util')
const fs = require('fs')

const jsonFromDb = async (dbPath) => {
  const exporter = sqliteJson(dbPath)
  const sqlRequest = `
    SELECT
      Title,
      Authors,
      json_extract(Highlight, '$.text') AS Text
    FROM Books
    INNER JOIN (SELECT
      OID AS BookID,
      Highlight
    FROM Items
    INNER JOIN (SELECT
      ParentID,
      Highlight
    FROM Items
    INNER JOIN (SELECT
      ItemID,
      Val AS Highlight
    FROM Tags
    WHERE TagID = 104
    AND Val <> '{\"text\":\"Bookmark\"}') AS Highlights
      ON Highlights.ItemID = OID) AS Highlights
      ON Highlights.ParentID = OID) AS Highlights
      ON BookID = OID;
  `

  const get = util.promisify(exporter.json).bind(exporter)

  return await get(sqlRequest)
}

const deleteFolder = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file) => {
      const curPath = `${path}/${file}`

      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}

module.exports = {
  jsonFromDb,
  deleteFolder,
}
