const monthLink = (yyyymmdd = "0000/00/00") =>
  `[${yyyymmdd.substr(0, 7)}]/${yyyymmdd.substr(-2)}`;
const common = (person, column) =>
  !person[column]
    ? `#${column}が登録されていない人`
    : person[column].includes("?")
      ? `${person[column]} #文字が認識できなかった人`
      : "";
const link = (person, column) =>
  common(person, column) || `[${person[column]}]`;
const text = (person, column) => common(person, column) || person[column];
const hasValue = (person, column) =>
  person[column] && !person[column].includes("?");

/**
 * 名刺の情報を Scrapbox のページに変換する
 * 情報が登録されていない場合は "#〇〇が登録されていない人" というタグをつける
 * 入力に失敗している場合は "#文字が認識できなかった人" というタグをつける
 * 
 * Scrapbox Scheme:
 * {
    "pages": [
      {
        "title": "page1title",
        "lines": [
          "page1title",
          "line2",
          "line3"
        ]
      },
      {
        "title": "page2title",
        "lines": [
          "page2title"
        ]
      }
    ]
  }
 * @param {Object} person 名刺の情報
 * @returns {Object} page title と lines を含むページの情報
 */
export default function template(person) {
  return {
    title: person[`氏名`],
    lines: `${person[`氏名`]}
 ${monthLink(person[`名刺交換日`])}に名刺交換した人
 ${link(person, `会社名`)}${person[`部署名`]}
 ${text(person, `URL`)}
 役職: ${link(person, "役職")}
 郵便番号: ${text(person, `郵便番号`)}
 住所: ${text(person, `住所`)}


[* 連絡先]
${[
      hasValue(person, "携帯電話") && `携帯電話: ${person["携帯電話"]}`,
      hasValue(person, "e-mail") && `e-mail: ${person["e-mail"]}`,
      hasValue(person, "TEL会社") && `TEL会社: ${person["TEL会社"]}`,
      hasValue(person, "FAX") && `FAX: ${person["FAX"]}`,
      hasValue(person, "TEL部門") && `TEL部門: ${person["TEL部門"]}`,
      hasValue(person, "TEL直通") && `TEL直通: ${person["TEL直通"]}`
    ]
      .filter(s => s)
      .map(s => " " + s)
      .join("\n")}


[* タグ]
${[
      hasValue(person, `Eightでつながっている人`) && `#Eightでつながっている人`,
      hasValue(person, `再データ化中の名刺`) && `#再データ化中の名刺`,
      person[`ヒント`] || ""
    ]
      .filter(s => s)
      .join(` `)}
`.split("\n")
  };
}
