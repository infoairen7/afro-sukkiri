# 受け入れチェック結果

企画書 第11章「受け入れチェック」と各段階（A〜E）の完了条件に対する確認結果です。

- 実行環境：Linux（クラウド作業環境）上の Headless Chromium（Playwright 1.56、WebGLはソフトウェア描画 SwiftShader、約2fps）
- 実機（iPhone / Android / PCのGPU付きブラウザ）では**確認していません**。下表の「未確認」は実機が必要な項目です。
- 再現方法：`npm test`（ロジック）／ `node scripts/e2e/acceptance.mjs`（ブラウザ。`dist/` を `http://127.0.0.1:5173/` で配信して実行）

## 企画書チェックリストとの対応

| 企画書の項目 | 結果 | 根拠 |
|---|---|---|
| iPhone Safari、Android Chrome、PC Chrome/Edge/Safari で実機確認 | **未確認** | 実機・GPU付きブラウザが無い環境のため。Headless Chromium でのみ確認 |
| 360×640、390×844、430×932、横画面、タブレット、PCで主要UIが隠れない | 確認済み（Chromium） | L-* の8サイズ。全タップ領域40px以上・横スクロールなし。320×568でも可 |
| 指がcanvas外へ出る、pointercancel、タブ切替、リサイズでバリカンが動き続けない | 確認済み | I-1〜I-4 |
| 正面を剃っても後頭部は減らない／すべての毛根へ到達できる | 確認済み | ロジックテスト「cutting from the front…」「every root is reachable…」、全5人×8髪型の40組合せ |
| 耳・顔・眉・ひげは消えない | 確認済み（構造上） | 刈る対象は毛根データのみ。顔パーツは当たり判定の遮蔽物としてのみ使用（結果画面・カードで眉/ひげ残存を目視） |
| 高速スワイプと押したままの両方で髪が減る | 確認済み | ロジックテスト「a very fast swipe…」「holding still…」 |
| 30/60fpsで同じ入力時間なら結果が大きく変わらない | 確認済み（ロジック） | 30/60/144fpsで高さの差 < 1e-4。実機のFPS自体は未計測 |
| 99％と100％の表示が正しい | 確認済み | C-1（残り1本で99.8%・未完了）、C-2（全0で100%）、ロジックテスト |
| 完了演出でタイムが延長されない | 確認済み | C-3（結果のタイム＝最後の毛根が0になった時刻−開始時刻） |
| 中断記録が通常TA自己ベストに入らない | 確認済み | T-2、T-3、記録テスト |
| 例の計算が99,200点になる | 確認済み | スコアテスト（原本 share-score.mjs と同一出力も確認） |
| NaN・負の秒・100,000点超えを保存しない | 確認済み | 記録テスト |
| X文面と結果カードのタイム・得点が一致 | 確認済み | C-4（文面・画面・カードは同じ結果オブジェクトから生成） |
| 投稿して戻っても結果を維持 | 確認済み（Chromium） | C-6。Xアプリあり／なし・未ログインでの実機遷移は**未確認** |
| 画像を自動添付したと誤表示しない | 確認済み | 結果画面に「画像は自動で付きません」を常時表示。保存は別ボタン（C-7） |
| 20回再挑戦でMesh・音源・イベント・粒子が累積しない | 確認済み | R-1（ジオメトリ・テクスチャ・シェーダ・シーン子要素・粒子が一定）、R-2。音源はモーター系を1回だけ生成し単発音は終了時に切断、イベントは起動時に1回だけ登録する設計 |
| ロード失敗の案内と回復 | 確認済み | F-1（404→案内→再試行で復帰） |
| WebGL非対応の案内 | 確認済み | F-2 |
| 音再生不可・保存領域不可でも遊べる | 確認済み | F-3 |
| PNG保存不可の案内と回復 | 確認済み | F-4（文面コピー・再生成を提示） |

## 段階ごとの完了条件

| 段階 | 完了の確認 | 結果 |
|---|---|---|
| A 操作試作 | スマホとPCで後頭部まで剃れる | Chromiumでマウス／タッチ相当のポインタ入力により全5視点から完走。実機は未確認 |
| B ゲーム成立 | 残り1束でも完了しない。再挑戦で初期化 | 確認済み（C-1、R-1） |
| C 共有 | 実際のタイムと点数が入り、公開URLが正しい | 確認済み（C-4、U-*：https公開URLのみ付与、localhost・未設定は省略） |
| D バリエーション | 固有機能が働き、全道具で完了できる | 確認済み（全6道具×完走テスト、ターボ周期テスト、ブラウザで各道具の効果を撮影） |
| E 仕上げ | 実機の画面・操作・性能を確認 | **未確認**（実機なし）。見た目の磨き込みは実施 |

## 通しプレイ（チートなし・実際のポインタ入力）

自動操作（ラスタ走査＋残り毛のリングを追う）で最後まで剃った記録。人間より非効率な動きのためランクは低めです。

| 人物・髪型・モード | 道具 | 結果（X文面） |
|---|---|---|
| いつものおじさん・まんまるアフロ・フリー | スタンダード | 159.73秒 / 72,889点 / B |
| にこ丸・くるくるパーマ・フリー | スタンダード | 64.69秒 / 79,191点 / B |
| しょん吉・炎のモヒカン・タイムアタック | スタンダード | アフロ、スッキリ。で全剃り達成！ / 120.43秒 / 71,651点 / B / しょん吉・炎のモヒカン・タイムアタック |

## ブラウザ受け入れチェック（37/37 合格）

| ID | 項目 | 結果 | 詳細 |
|---|---|---|---|
| L-320x568 | 主要UIが画面内 (320×568) | ✅ | all visible; canvas 320×255; small targets: none |
| L-360x640 | 主要UIが画面内 (360×640) | ✅ | all visible; canvas 360×387; small targets: none |
| L-390x844 | 主要UIが画面内 (390×844) | ✅ | all visible; canvas 390×571; small targets: none |
| L-430x932 | 主要UIが画面内 (430×932) | ✅ | all visible; canvas 430×656; small targets: none |
| L-844x390 | 主要UIが画面内 (844×390) | ✅ | all visible; canvas 569×390; small targets: none |
| L-768x1024 | 主要UIが画面内 (768×1024) | ✅ | all visible; canvas 768×747; small targets: none |
| L-1024x768 | 主要UIが画面内 (1024×768) | ✅ | all visible; canvas 695×768; small targets: none |
| L-1366x768 | 主要UIが画面内 (1366×768) | ✅ | all visible; canvas 938×768; small targets: none |
| I-1 | 指がcanvas外へ出たら止まる | ✅ | {"during":1,"after":null,"pressing":false,"still":true} |
| I-2 | pointercancelで止まる | ✅ | {"after":null,"pressing":false} |
| I-3 | タブ切替で止まる（フリーは一時停止→再開） | ✅ | {"after":null,"run":"paused","pressing":false,"resumed":"running"} |
| I-4 | リサイズで止まる | ✅ | {"after":null,"pressing":false} |
| I-5 | 2本目の指は剃り入力にならない | ✅ | {"id":1,"still":1,"end":null} |
| I-6 | 視点変更は指を離してから反映 | ✅ | {"during":0,"after":2} |
| I-7 | 自由回転モード中は剃れず、回転だけ | ✅ | {"cutWhileRotating":false,"azChanged":true} |
| I-8 | 刃先オフセット: タッチ32px上・PC0 | ✅ | {"touch":{"x":100,"y":168},"mouse":{"x":100,"y":200}} |
| I-9 | ページエラーなし（入力テスト中） | ✅ |  |
| C-1 | 残り1本では完了しない／99%を100%と表示しない | ✅ | {"run":"running","remaining":1,"hud":"99.8%","ratio":0.9988545246277205} |
| C-2 | 全毛根0でクリア、表示100% | ✅ | run=complete hud=100% |
| C-3 | 完了演出でタイムが延長されない | ✅ | elapsed=4982.4 fixedAtComplete=4982.4 |
| C-4 | X文面と結果画面のタイム・得点が一致 | ✅ | アフロ、スッキリ。で全剃り達成！ / 4.98秒 / 100,000点 / SS / いつものおじさん・まんまるアフロ・フリー |
| C-5 | Xボタンは新しいタブ・noopener（埋め込みなし） | ✅ | _blank noopener noreferrer |
| C-6 | 投稿画面を開いて戻っても結果を維持 | ✅ | {"screen":"result","shown":"00:04.98"} |
| C-7 | 結果画像(PNG)を保存 | ✅ | afro-sukkiri-20261007-0140.png |
| C-8 | ページエラーなし（完了テスト中） | ✅ |  |
| T-1 | タイムアタックはスタンダード固定・他道具不可 | ✅ | tool=standard |
| T-2 | TAで一時停止→「中断あり」 | ✅ | {"interrupted":true,"badge":true} |
| T-3 | 中断したTAは自己ベスト対象外・文面に明記 | ✅ | アフロ、スッキリ。で全剃り達成！ / 5.66秒 / 100,000点 / SS / むす鉄・まんまるアフロ・タイムアタック（中断あり） |
| R-1 | 20回再挑戦でMesh・テクスチャ・シーン子要素が累積しない | ✅ | {"a":{"geo":20,"tex":2,"head":5,"ov":3,"prog":17},"b":{"geo":20,"tex":2,"head":5,"ov":3,"prog":17},"particles":0,"pointer":null,"running":"ready"} |
| R-2 | 髪型・人物の切替で累積しない | ✅ | {"before":[20,5],"after":[15,5]} |
| F-1 | 読み込み失敗を案内し、再試行で回復 | ✅ | 読み込みに失敗しました。通信状況を確認して、もう一度お試しください。 → retry ok=true |
| F-2 | WebGL非対応の環境案内 | ✅ | この端末・ブラウザでは3D表示（WebGL）が使えません。 |
| F-3 | 保存領域不可・音再生不可でも遊べる | ✅ | {"storage":false,"audioFailed":true,"started":"running"} |
| F-4 | PNG保存不可→文面コピーとリトライを提示 | ✅ | 画像を作成・保存できませんでした。文面だけコピーするか、もう一度試してください。 |
| U-https://example.github.io/afro-sukkiri/ | 公開URL設定「https://example.github.io/afro-sukkiri/」→ url=https://example.github.io/afro-sukkiri/ | ✅ | url=https://example.github.io/afro-sukkiri/ |
| U-http://localhost:5173/ | 公開URL設定「http://localhost:5173/」→ url=省略 | ✅ | url=null |
| U-empty | 公開URL設定「未設定」→ url=省略 | ✅ | url=null |

> C・T・U・F の一部では、待ち時間短縮のため `?debug` 専用フックで残り1本まで一気に減らし、最後の1本は実際のポインタ入力で剃っています（このためタイムが数秒・満点になっています）。

## ロジックの自動テスト（39件）

- ✅ all 8 hairstyles can be fully shaved — character base
- ✅ all 8 hairstyles can be fully shaved — character joy
- ✅ all 8 hairstyles can be fully shaved — character anger
- ✅ all 8 hairstyles can be fully shaved — character sadness
- ✅ all 8 hairstyles can be fully shaved — character laughter
- ✅ interrupted time attack never becomes a personal best
- ✅ free and time attack bests are separate
- ✅ best time and best score are stored independently
- ✅ NaN, negative and >100,000 results are not saved
- ✅ old records without characterId load as base
- ✅ corrupt storage does not throw
- ✅ GAME_PLAN ch.8 example: classic, 28.46 s, E=0.92 → 99,200 SS
- ✅ port matches the pack reference for many inputs
- ✅ score never exceeds 100,000 and rejects invalid times
- ✅ X intent: Japanese text, hashtags, url omitted for localhost/unset
- ✅ interrupted runs are labelled
- ✅ clean percent: 99 % is never shown as 100
- ✅ cutting from the front never touches the back of the head
- ✅ every root is reachable from the 5 view buttons — standard
- ✅ every root is reachable from the 5 view buttons — wide
- ✅ every root is reachable from the 5 view buttons — turbo
- ✅ every root is reachable from the 5 view buttons — vacuum
- ✅ every root is reachable from the 5 view buttons — detail
- ✅ every root is reachable from the 5 view buttons — polish
- ✅ hair classic can be fully shaved with the standard clipper
- ✅ hair jumbo can be fully shaved with the standard clipper
- ✅ hair tight can be fully shaved with the standard clipper
- ✅ hair mohawk can be fully shaved with the standard clipper
- ✅ hair twins can be fully shaved with the standard clipper
- ✅ hair swirl can be fully shaved with the standard clipper
- ✅ hair flat can be fully shaved with the standard clipper
- ✅ hair rainbow can be fully shaved with the standard clipper
- ✅ 30 fps and 60 fps give the same result for the same input
- ✅ a very fast swipe leaves no gap along its path
- ✅ holding still shaves a spot down to the scalp
- ✅ one remaining root keeps the run incomplete
- ✅ timer does not start until the head is touched
- ✅ turbo boosts 1 s of every 3 s and resets when released
- ✅ ear-buried roots get a visual base offset, data unchanged

## 未確認・要実機確認の項目（まとめ）

- iPhone Safari／Android Chrome／PC Chrome・Edge・Safari（GPU付き）での表示・操作感
- 中程度のスマホで30fps以上、余裕のある端末で60fpsという性能目標（未計測。重い端末向けに「画質：自動→軽量」の切替を実装済み）
- Web Audio の実際の聞こえ方・音量バランス、振動（Vibration API）の体感
- Xアプリあり／なし・未ログイン時の Web Intent 遷移と、戻ったときの挙動（Chromiumでは新しいタブで開き結果は維持）
- iOS Safari での PNG 保存（ダウンロード）と `navigator.share` のファイル共有シート
- セーフエリア（ノッチ・ホームバー）の実機表示
