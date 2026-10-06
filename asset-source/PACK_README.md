# アフロ、スッキリ。 制作パック v1.1

スマホでも遊べる「3Dおじさんのアフロを剃る」ゲームの企画・デザイン・制作開始用素材です。完成したゲームではありません。

## Claudeへの渡し方

1. docs/CLAUDE_START.md の文章をコピーして依頼する。
2. docs/GAME_PLAN.md と design/01～03・05のデザイン画を渡す。
3. 開発環境にmodels・data・snippetsを配置する。Claudeの利用環境がZIPやGLBを直接読めない場合、開発用プロジェクトに解凍して配置する。

## 同梱物

- docs/GAME_PLAN.md：詳細企画・操作・スコア・X共有・実装条件。
- docs/CLAUDE_START.md：そのまま渡せる制作依頼文。
- docs/IMAGE_PROMPTS.md：デザイン画の再生成用プロンプト。
- design/01_character_hair.png：キャラと髪型8種の目標ビジュアル。
- design/02_clippers.png：バリカン6種の目標ビジュアル。
- design/03_mobile_ui.png：開始・プレイ・結果画面の目標ビジュアル。
- design/04_glb_preview.png：同梱簡易モデルの形状プレビュー（ソフトウェア描画）。
- models/ojisan_base.glb：おじさんのバスト。髪は別。
- models/hair/*.glb：髪型8点。おじさんと同じ原点に配置。
- models/clippers/*.glb：バリカン6点。
- data/catalog.json：素材パス、髪型基準タイム、バリカン基本パラメータ。
- data/hair_*.json：毛根位置・法線・成長方向・初期高さ・色。
- data/model_parts.json：簡易形状の再構成用メタデータ。
- snippets/：計算・X投稿リンクの関数、UIカラー・寸法トークン。
- source/build_models.py：同梱の簡易GLBと毛根データの再生成用ソース（Python 3＋numpy）。
- ASSET_MANIFEST.json：素材の一覧と容量。

## モデルの扱い

Y-up／顔は+Z／頭中心が原点。任意のゲーム単位。頭半径はX=.78、Y=1、Z=.78。ヘアと顔を別々に拡縮せず同じ親に置く。バリカン刃先中心はローカル[0,.30,0]。髪の各ノードにrootIdを格納。

毛根normalは頭皮法線（可視・遮蔽判定用）、growthDirectionは毛が伸びる方向（描画用）。通常は同じですが、flatの上部は+Y方向です。毛束中心はposition + growthDirection * currentHeight / 2。

GLBは標準glTF 2.0のメッシュと色だけで、外部テクスチャは不要です。顔リグ、表情モーフ、完成版の巻き毛、効果音、UIの実装、ゲーム処理は含まれません。デザイン画像と同じ品質の完成モデルではなく、挙動を作るための簡易素材です。吸引機の窓も簡易不透明表現です。

髪型GLBをそのまま大量のMeshとして動かすと描画負荷が高くなるため、ゲームでは毛根JSONからインスタンス化してください。詳細はGAME_PLAN.mdを参照。

## 権利・外部依存

このパックのGLB・JSON・補助コードは今回生成したオリジナル素材です。3枚のコンセプト画は生成画像です。第三者の3Dモデルやゲームキャラクターを同梱していません。Three.js本体やフォントファイルもパックには含めていません。外部ライブラリはClaude側で導入・ライセンス表示を管理してください。

ゲームの公開・Xへの実際の投稿は、このパックでは実行していません。

## v1.1 追加内容

喜・にこ丸、怒・むす鉄、哀・しょん吉、楽・ゲラ蔵の簡易3Dモデル4点を追加。人物は合計5名、GLB全体は19点です。

- models/characters/*.glb：追加の4人。
- data/characters.json：人物選択用の正本。
- data/character_parts.json：顔の構成パーツ。
- design/05_emotion_characters.png：目標ビジュアル。
- design/06_emotion_glb_preview.png：実際の簡易形状のプレビュー。
- docs/CHARACTERS_V1_1.md：選択UI・互換・反応・Claude追加指示。
- source/build_characters.py：追加モデルの再生成。build_models.pyの後に実行します。

まずdocs/CLAUDE_START.mdをClaudeへ渡してください。このZIPだけで初版と追加分の両方が揃います。
