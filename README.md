# scrap8
Eight からエクスポートした CSV を Scrapbox にインポートできる JSON に変換します

## Requirements
- 実行には Node.js と npm が必要
- Eight の名刺データをダウンロードできるのはプレミアム会員のみ (ステマじゃないです)

## Install
> npm install -g scrap8

## Usage
1. Eight(Web版) のダッシュボードから[名刺のダウンロード](https://8card.net/export/csv_orders) => ダウンロードファイルを作成をクリック
1. 生成が終わるのを待ち, UTF-8 版をダウンロード
1. このツールで名刺データを変換
1. [Scrapbox](https://scrapbox.io/) にログイン
1. 名刺をインポートしたいプロジェクトを作成
1. さっき変換しておいたファイルをプロジェクトにインポート

## CLI
```
Usage: scrap8 [options] <file ...>

Options:

  -V, --version    output the version number
  -t, --template   Use javascript template exporting default function without .js
  -o, --out [out]  Convert all input files into a single file
  --no-debug       Disable debug log
  -h, --help       output usage information
```

## API
> npm i -S scrap8

```javascript
const scrap8 = require('scrap8');

const pages = scrap8({
    args: ['./filename.csv'],
    out: './output.json',
    debug: true
});
```

## Example
```
Daiki Teramoto
 [2016/05]/27に名刺交換した人
 [HackforPlay, Inc.]
 http://twitter.com/teramotodaiki
 役職: [CEO]
 郵便番号: 920-0856
 住所: 石川県金沢市?町?町? #文字が認識できなかった人


[* 連絡先]
 携帯電話: 080-0000-0000
 e-mail: teramoto@example.com


[* タグ]
#Eightでつながっている人

```
