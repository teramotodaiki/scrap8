import fromPairs from "lodash/fromPairs";
import zipObject from "lodash/zipObject";
import mapValues from "lodash/mapValues";
import csvParse from "csv-parse/lib/sync";

/**
 * CSV データの行頭に書かれている注意書きなどの行数
 * delimiter つけずに直接文章書き込んでる. ヤバい
 */
const offsetRow = 8;
/**
 * Eight のスキーム (2018/06/01 時点)
 */
const csvScheme = [
  `会社名`,
  `部署名`,
  `役職`,
  `氏名`,
  `e-mail`,
  `郵便番号`,
  `住所`,
  `TEL会社`,
  `TEL部門`,
  `TEL直通`,
  `FAX`,
  `携帯電話`,
  `URL`,
  `名刺交換日`,
  `Eightでつながっている人`,
  `再データ化中の名刺`,
  `'?'を含んだデータ`
];
let unknownUserIndex = 0;

export default function parse(csvText) {
  // TODO: Stream
  return csvText
    .split("\n")
    .slice(offsetRow)
    .map(toJSON);
}

/**
 * CSV を JSON { "column": "value" } に変換する
 * 氏名の入力に失敗していた場合:
 *  "名前が分からない人 0001"のような氏名をつける
 *  "#名前が分からない人"というタグをつける
 *  また, 少しでも分かっている部分があれば
 *   ["ヒント"]に"名前が分からない人"というタグとヒントを残す
 * @param {String} csvRow CSV テキストの行
 * @returns {Object} { "column": "value" }
 */
export function toJSON(csvRow) {
  const row = csvParse(csvRow)[0];
  let hash = zipObject(csvScheme, row);

  if (!hash[`氏名`] || hash[`氏名`].includes("?")) {
    const num = (++unknownUserIndex + "").padStart(4, "0"); // like 0001
    if (hash[`氏名`]) {
      hash[`ヒント`] = `#名前が分からない人 ヒント: ${hash[`氏名`]}`;
    }
    hash[`氏名`] = `名前が分からない人 ${num}`;
  }
  return hash;
}
