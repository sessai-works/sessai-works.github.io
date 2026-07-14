// Auto-generated, fully-anonymized snapshot of portfolio works data.
// Source of truth: private dashboard. Regenerate with scripts, do NOT hand-edit names.
// Contains NO employer / client / colleague identifiers by design.
var DASHBOARD_DATA = {
  "summary": {
    "toolsInProduction": 18,
    "totalProjects": 23,
    "categories": 6,
    "maxReduction": 96
  },
  "projects": [
    {
      "name": "業務マニュアル自動作成ツール",
      "nameEn": "Auto Manual Generator",
      "category": "document",
      "status": "live",
      "description": "文字起こしをアップロードするだけで業務マニュアルを自動生成",
      "detail": {
        "overview": "引継ぎMTGの文字起こしデータから、見出し・手順・注意事項を整理した業務マニュアルを自動生成するAIツール。生成されたマニュアルはWordファイル（.docx）として出力され、指定したSharePointフォルダに自動格納される。",
        "background": "引継ぎMTG後に手作業でマニュアルを作成していたが、1件あたり2〜3時間かかっており、担当者の大きな負担になっていた。品質のばらつきも課題だった。",
        "tools": [
          "Dify（AIワークフロー構築ツール）",
          "LLM（大規模言語モデル、ChatGPT等のAI）",
          "Python（プログラミング言語）",
          "SharePoint（社内データ保管ツール）",
          "Power Automate（Microsoftの業務自動化ツール）"
        ],
        "impact": {
          "before": "手作業でマニュアルを作成（1件あたり2〜3時間）",
          "after": "ファイルをアップロードするだけで自動生成（約5分）",
          "savedTime": "1件あたり約2.5時間削減"
        }
      }
    },
    {
      "name": "社内ナレッジAIチャットボット",
      "nameEn": "Internal Knowledge AI Chatbot",
      "category": "knowledge",
      "status": "live",
      "description": "社内ルール・業務ノウハウをAIチャットで即座に検索・回答",
      "detail": {
        "overview": "社内ルール・業務ノウハウ・ツール操作方法などを、AIチャットで質問するだけで即座に回答を得られるシステム。3ファイル体制のナレッジベースを構築し、ブラウザからアクセス可能。",
        "background": "社内ルールや手続きについて「詳しい人に聞く」「マニュアルを探す」ことに数十分かかるケースが多く、特に新人支援で非効率が目立っていた。",
        "tools": [
          "Dify（AIワークフロー構築ツール）",
          "GPT-4o（OpenAIのAI）",
          "Tavily（AI向け検索エンジン）"
        ],
        "impact": {
          "before": "マニュアルを探す・詳しい人に聞く（数十分かかることも）",
          "after": "AIに質問するだけで即回答（数秒）",
          "savedTime": "問い合わせ対応・検索時間を大幅削減"
        }
      }
    },
    {
      "name": "チャット通知自動化システム",
      "nameEn": "Chat Notification Automation",
      "category": "notification",
      "status": "testing",
      "description": "Chatwork（ビジネスチャット）に届いたメッセージをTeamsへ自動通知し、未対応が続くと自動返信でフォローするシステム",
      "detail": {
        "overview": "クライアントからChatwork（ビジネスチャット）に届いたメッセージを、社内で普段使っているTeamsに自動で通知するシステムです。Teamsのメンション（@指名）連動、30分間未対応の場合の自動返信、営業時間内／時間外での文面の自動切替など、細かい気配りまで自動化しています。",
        "background": "Chatworkを定期的に確認しないとメッセージを見逃すリスクがあり、クライアント対応の遅延が発生していた。普段使っているTeamsで気づける仕組みが必要だった。",
        "tools": [
          "Python（プログラミング言語）",
          "FastAPI（Pythonのサーバ用フレームワーク）",
          "Railway（クラウドサーバサービス）",
          "Power Automate（Microsoftの業務自動化ツール）",
          "Microsoft Graph API（Teamsに投稿するための連携口）"
        ],
        "impact": {
          "before": "Chatworkを定期的に確認 → 見逃し・対応遅延のリスク",
          "after": "Teamsに自動通知 + 未対応時は自動返信でクライアント安心",
          "savedTime": "クライアント対応の見逃しゼロ化"
        }
      }
    },
    {
      "name": "案件マッチングメール自動配信",
      "nameEn": "Job Matching Auto-Mailer",
      "category": "matching",
      "status": "live",
      "description": "AIチャットに案件情報を入力するだけで、登録人材へのオファーメール作成・一斉配信・回答集計まで自動で完結",
      "detail": {
        "overview": "案件発生時に、AIチャットへ案件情報を入力するだけで、オファーメールの作成・対象者の抽出・一斉配信・エントリー回答の集約まで自動で完結するシステム。kintone（人材情報管理ツール）に登録された数百名の業務委託パートナーから、雇用形態・基本単価・配信可否などの条件で対象者を自動抽出し、共有メールアドレスからBCC（一斉送信時に宛先が互いに見えない形式）でオファーメールを配信。応募はMicrosoft Forms（アンケートフォーム）で集約し、Excel管理台帳として担当者と自動共有される。案件単位での担当者CC追加（最大2名）・スポット配信除外（カンマ区切りでメールアドレス指定）にも対応し、毎回kintone側の設定を変えずに案件ごとの細かな配信制御を実現。",
        "background": "案件発生のたびに、担当者がメール文面を手作業で作成し、kintoneから対象者を目視で抽出して数百名分のアドレスをBCCに貼り付け、応募回答をメール・チャットで個別集計していた。1件あたり1〜2時間を要し、案件数増加に伴い大きな負担となっていた。【主な課題】(1)文面の品質ばらつき、(2)対象者抽出の手間と漏れ（kintoneフィルタの手動設定でミスが起きやすい）、(3)誤送信リスク（配信除外パートナーのチェック漏れ）、(4)応募集計の煩雑さ（返信メールから手作業で台帳に転記）、(5)CC追加運用（案件担当者を都度CCに入れたいがkintone設定変更は現実的でない）。Mini版は『AIチャットに入力するだけで全自動で配信完了』を最小構成で実現し、将来のフル版（個別送信＋AIスコアリング）への足がかりとする位置づけ。",
        "tools": [
          "Dify（AIワークフロー構築ツール）",
          "Make（ノーコード自動化ツール）",
          "kintone（人材情報管理ツール）",
          "Outlook（メールツール）",
          "Microsoft Forms（アンケートフォーム）"
        ],
        "impact": {
          "before": "手動でメール作成・送信・回答集計（数時間/回）",
          "after": "AIチャットに入力1回で全自動（数分）",
          "savedTime": "1回あたり数時間の作業を数分に短縮"
        }
      }
    },
    {
      "name": "工数分析レポート自動作成",
      "nameEn": "Work-Hours Analysis Report Generator",
      "category": "report",
      "status": "building",
      "description": "月次の作業ログCSVから、クライアント向けレポートと社内用レポートの2種類を自動で作り分けるAIツール",
      "detail": {
        "overview": "クライアントの月次作業ログCSVから、業務別・担当者別・月初中末別の工数分析を行い、クライアント向けレポート（提出可能）と社内専用レポート（提出禁止）の2種類を自動生成するDifyワークフロー。",
        "background": "工数データの集計・レポート作成に時間がかかっており、カスタムGPTで原型を運用していたが、社内ツール化・自動配信のためDifyに移植。",
        "tools": [
          "Dify（AIワークフロー構築ツール）",
          "LLM（大規模言語モデル、ChatGPT等のAI）",
          "Python（プログラミング言語）",
          "Power Automate（Microsoftの業務自動化ツール）"
        ],
        "impact": {
          "before": "カスタムGPTに手動でCSVアップロード→レポート手作業で整形",
          "after": "Difyワークフローで分析→Word生成→SharePoint保存→Teams通知まで自動化",
          "savedTime": "レポート作成の工数を大幅削減"
        }
      }
    },
    {
      "name": "AI活用相談ボット",
      "nameEn": "AI Consultation Bot",
      "category": "knowledge",
      "status": "building",
      "description": "業務効率化・自動化の相談をAIが対話形式で聞き取り、内容を整理して社内データベースに保存する相談受付システム",
      "detail": {
        "overview": "社員が業務効率化・自動化の相談をAIチャットボットに入力すると、Dify上のAIが対話形式で必要情報をヒアリングし、構造化テキストを生成。社員本人が内容を確認・修正した後、MakeでSharePoint Listに保存しTeamsで通知する社内DX相談受付システム。",
        "background": "社員ごとに説明能力・業務整理能力が異なるため、相談内容のヒアリングが非効率になり、再ヒアリングが多発していた。AIによる標準化されたヒアリングで解決を図る。",
        "tools": [
          "Dify（AIワークフロー構築ツール）",
          "Make（ノーコード自動化ツール）",
          "SharePoint（社内データ保管ツール）",
          "GitHub Pages（静的サイト公開サービス）"
        ],
        "impact": {
          "before": "相談内容が整理されず再ヒアリングが多発（1件30分〜1時間）",
          "after": "AIが対話で必要情報を漏れなく収集・構造化（数分）",
          "savedTime": "ヒアリング・要件整理の工数を大幅削減"
        }
      }
    },
    {
      "name": "議事録自動作成ツール",
      "nameEn": "Auto Meeting Minutes Generator",
      "category": "document",
      "status": "testing",
      "description": "会議の文字起こしから、要点・決定事項・次のアクションを整理した議事録を自動で生成するAIツール",
      "detail": {
        "overview": "会議の文字起こしデータから、要点・決定事項・アクションアイテムを整理した議事録を自動生成するツール。現在カスタムGPTで原型を制作済み。",
        "background": "会議後の議事録作成に30分〜1時間かかるケースがあり、作成の負担や品質のばらつきが課題だった。",
        "tools": [
          "カスタムGPT（ChatGPTの業務特化版）",
          "→ Dify（AIワークフロー構築ツール） / Make（ノーコード自動化ツール）（移行検討中）"
        ],
        "impact": null
      }
    },
    {
      "name": "決算報告書Reader",
      "nameEn": "Financial Statement Reader",
      "category": "report",
      "status": "live",
      "description": "決算書PDFから数値を自動で読み取り、整合性チェック・3期比較・原因分析・今後の打ち手まで提案するAIツール",
      "detail": {
        "overview": "決算報告書のPDFを1期ずつアップロードすると、AIが数値を読み取り、整合性チェック・3期比較分析・原因分析・今後のKPI（重要指標）とアクションプラン提案まで自動で行うシステムです。PDF投入前に会社規模・業種・取引形態・経営の重点・経営課題の5項目を対話形式で聞き取ることで、1期分の決算書でも精度の高い分析ができます。経営サマリーダッシュボードと3段階の分析レポート（現状把握→原因分析→今後の活用プラン）をまとめて出力し、分析後はAIチャットで追加の質問にも答えます。スキャン画像のPDFにも自動対応。",
        "background": "既存のカスタムGPT『決算報告書ReaderGPT』をより柔軟なAIツール（Dify）へ移行したプロジェクト。ユーザーからのフィードバック6項目（選択式UI、経営サマリーの追加、前提情報の聞き取り標準化、コンサルレベルの提案、ビジョンを踏まえた洞察など）を反映し、対話形式で前提情報を先に集めることで、決算書が1期分しかなくても精度の高い分析が可能になりました。",
        "tools": [
          "Dify（AIワークフロー構築ツール）",
          "GPT-4o（OpenAIのAI）",
          "GPT-4o PDF OCRプラグイン（画像PDFの文字読取）"
        ],
        "impact": null
      }
    },
    {
      "name": "AIスケジューラー",
      "nameEn": "AI Scheduler",
      "category": "management",
      "status": "live",
      "description": "AIがプロジェクト状況を分析し、Outlook予定表の空き時間に作業予定を自動配置する3日間ローリングスケジューラー",
      "detail": {
        "overview": "AI活用プロジェクトダッシュボードのプロジェクトデータ（data.js）をAIが分析し、優先順位を判定。Outlook予定表の空き時間に作業予定を自動配置する3日間ローリングスケジューラー。毎朝8:00に自動実行し、状況変化に応じて予定を再評価・更新する。",
        "background": "複数のAIプロジェクトを同時進行する中、どのプロジェクトにいつ時間を割くべきかの判断が属人的で、着手の優先順位付けに毎朝時間を使っていた。",
        "tools": [
          "Make（ノーコード自動化ツール）",
          "OpenAI（ChatGPTを提供するAI企業のAPI）",
          "Microsoft Graph API（Outlook連携用）",
          "GitHub Pages（Webページ公開サービス）"
        ],
        "impact": {
          "before": "毎朝手動でプロジェクト状況を確認し、何に取り組むか判断（15〜30分）",
          "after": "AIが自動で優先順位を判定し、Outlook予定に作業予定を配置（自動）",
          "savedTime": "毎朝の判断・計画時間を削減 + プロジェクト停滞の防止"
        }
      }
    },
    {
      "name": "商談分析月次レポート自動作成",
      "nameEn": "Sales Meeting Monthly Report Generator",
      "category": "report",
      "status": "live",
      "description": "商談議事録をAIが自動分析し、FACT・INSIGHT・ACTIONの3層構造で月次レポートを生成",
      "detail": {
        "overview": "SharePointに保存された商談議事録（Word文書）を毎月自動で集め、AIが分析して月次レポートを作成するシステムです。事前にPython（プログラム言語）で勝ちパターンの分析・営業ファネル（商談の進捗段階）分析・断り文句の分類・データ品質チェック・見込み案件の推定を計算し、AIは分析結果の意味付け（INSIGHT）と次のアクション提案に集中する構成にしています。表や案件一覧はPythonで直接作るため数値が正確。毎月1日の午前10:30にWindows標準機能で自動実行されます。",
        "background": "商談の議事録が『記録』として蓄積されるだけで、経営データとして活用できていないという課題がありました。毎月30〜40件の議事録から、傾向・失注パターン・勝ちパターンを抽出し、全社の意思決定に使える情報へ転換することが目的です。",
        "tools": [
          "Python（プログラミング言語）",
          "OpenAI API（ChatGPTを提供するAIの連携口）",
          "Microsoft Graph API（SharePoint・Teams連携用）",
          "SharePoint（社内データ保管ツール）",
          "Teams（社内コミュニケーションツール）"
        ],
        "impact": {
          "before": "議事録が記録として蓄積されるだけ。傾向分析・パターン把握は手作業で困難",
          "after": "AIが自動で15カテゴリ分析→月次レポート生成→SharePoint保存→Teams通知",
          "savedTime": "商談データの分析・レポート作成を全自動化"
        }
      }
    },
    {
      "name": "商談分析四半期レポート自動作成",
      "nameEn": "Sales Meeting Quarterly Report Generator",
      "category": "report",
      "status": "live",
      "description": "3ヶ月分の月次構造化データを統合し、四半期トレンド分析・パイプライン追跡・戦略提案レポートを自動生成",
      "detail": {
        "overview": "月次レポートで蓄積した3ヶ月分の構造化データ（約120件の商談）を統合し、四半期トレンド分析レポートを自動生成するシステムです。事前にPython（プログラム言語）で月別推移・パイプライン（見込み案件）追跡・勝ちパターン差分・ファネル（商談進捗段階）分析・断り文句の分類・データ品質チェックを計算し、AIは分析結果の意味付けとアクション提案に集中します。月次では見えない時系列の変化、同じ企業の進捗追跡、次四半期の戦略提案までカバー。",
        "background": "月次レポートでは個別の月の状況しか見えず、3ヶ月間の傾向変化やパイプラインの進捗が把握できないという課題がありました。経営層向けに、四半期単位の戦略的な分析が求められていました。",
        "tools": [
          "Python（プログラミング言語）",
          "OpenAI API（ChatGPTを提供するAIの連携口）",
          "Microsoft Graph API（SharePoint・Teams連携用）",
          "SharePoint（社内データ保管ツール）",
          "Teams（社内コミュニケーションツール）"
        ],
        "impact": {
          "before": "月次レポートの個別確認のみ。四半期トレンドは手動で比較分析が必要",
          "after": "3ヶ月分を自動統合。月別推移・パイプライン追跡・勝ちパターン差分を自動分析",
          "savedTime": "四半期分析レポートの作成を全自動化（約2分で完了）"
        }
      }
    },
    {
      "name": "AI活用プロジェクトダッシュボード",
      "nameEn": "AI Project Dashboard",
      "category": "management",
      "status": "live",
      "description": "担当者が担当するAI活用プロジェクトの進捗・ステータスを一覧管理するWebダッシュボード",
      "detail": {
        "overview": "担当者が担当するAI活用プロジェクトの進捗・ステータス・作業歴・次のアクションを一覧で確認できるWebダッシュボード。カード/リスト切替、検索・フィルター・ソート、日英切替、印刷対応など多機能。GitHub Pagesで社内公開中。",
        "background": "複数のAI活用プロジェクトを同時に担当する中、各プロジェクトの進捗やステータスを一元的に把握・共有する手段がなかった。",
        "tools": [
          "HTML（Web画面の基本技術）",
          "CSS（Web画面のデザイン）",
          "JavaScript（Webの動的処理）",
          "GitHub Pages（Web公開サービス）"
        ],
        "impact": {
          "before": "プロジェクト状況を個別に口頭やチャットで確認",
          "after": "ダッシュボードでリアルタイムに一覧確認",
          "savedTime": "進捗共有・報告の工数を削減"
        }
      }
    },
    {
      "name": "AI研修カリキュラム",
      "nameEn": "AI Training Curriculum",
      "category": "knowledge",
      "status": "live",
      "description": "新卒向けAI研修スライド全5回＋スクリプト完成。第4回テーマを「ChatGPTでExcel表自動生成＋マスキング」に全面書換(2026-05-18)。GitHub Pages公開中。第4回5/18・第5回5/27開催待ち",
      "detail": {
        "overview": "新卒社員向けのAI研修を全5回のHTMLスライドで制作。第1回:AI基礎と安全な使い方、第2回:4つの業務場面とプロンプトの書き方、第3回:AIの業務組み込みとナレッジ資産化、第4回:手入力10分の表がChatGPTで30秒に — 機密情報を守りながら経理のExcel作業を自動化する(5/18開催)、第5回:AIを安心して使い続ける(報告・リカバリ・同期との学び合い、5/27開催)。第4回は当初の品質保証テーマからExcel自動生成＋マスキング実務テーマに全面書換(2026-05-18)。",
        "background": "新卒社員がAIツールを安全かつ効果的に業務で活用できるよう、体系的な研修カリキュラムが必要だった。第3回完了後、新卒からのフィードバックを受けて全5回に拡張。",
        "tools": [
          "HTML（Web画面の基本技術）",
          "CSS（Web画面のデザイン）",
          "JavaScript（Webの動的処理）",
          "GitHub Pages（Web公開サービス）"
        ],
        "impact": {
          "before": "AI研修の体系的な教材がなく、口頭での説明に依存。新卒は使い方を覚えても提出品質や上司への報告で詰まることが多かった",
          "after": "全5回の統一されたスライド教材でいつでも研修可能。第4回で品質保証の型・第5回で安心して使い続ける運用までカバー",
          "savedTime": "研修準備時間の削減＋教育品質の均一化＋新卒の現場ミス削減"
        }
      }
    },
    {
      "name": "パーソナルタスク統合管理ボード",
      "nameEn": "Personal Task Integrated Board",
      "category": "management",
      "status": "live",
      "description": "全プロジェクトの残タスクを1画面で可視化し、タスク単位で推定工数・実績時間・Outlook予定連携まで行う個人用の補助ツール",
      "detail": {
        "overview": "プロジェクト単位のステータス管理を補完し、タスク単位の残/完了/推定工数/実績時間を可視化する個人用ツール。全プロジェクトのPLAN.mdをパースしてタスクデータを生成し、ローカル環境で表示。詳細画面からフォーカスモードでタスク単位の実作業時間を自動計測→localStorageに蓄積→セッション終了時にClaude CodeがPLAN.mdへ反映。実績データが蓄積されるとAIの工数推定精度が向上するフィードバックループを形成し、AIプロジェクトスケジューラーをタスク粒度にアップデートしてOutlook予定自動生成の精度も向上させる。",
        "background": "現在、各プロジェクトの残タスクを確認するたびにClaude Codeに聞く必要があり、タスク単位の可視化が不足していた。また、工数計測はセッション内dateコマンド手動実行で運用が複雑だった。参考UI: 表ロビー純平氏作「FLIGHT STRIP TODO」（航空管制ストリップ風ダークUI）。",
        "tools": [
          "HTML（Web文書の記述言語）",
          "JavaScript（Webで動きを作る言語）",
          "Node.js（プログラムを動かす実行環境）",
          "Cloudflare Workers（APIを安全に中継するサービス）",
          "GitHub Pages（静的サイト公開サービス）"
        ],
        "impact": null
      }
    },
    {
      "name": "決算書PDF Masker",
      "nameEn": "Financial Statement PDF Masker",
      "category": "document",
      "status": "testing",
      "description": "決算書PDFの機密情報（社名・人名・住所・電話番号・口座情報等）を自動検出し、AI投入用に安全化するローカル完結ツール",
      "detail": {
        "overview": "クライアントの決算報告書PDFに含まれる企業機密・個人情報（社名・人名・住所・電話番号・口座情報等）を自動検出し、Dify決算報告書Readerに安全に投入できるようマスキングするツール。GiNZA（日本語NER）＋Python re（正規表現）の2パスでマスク対象を検出し、Streamlit UIで候補のON/OFF切替・手動追加・確認が可能。同一文字列は同一トークン（例: 株式会社SORA→COMPANY_001）に決定論的に置換するため、AI分析結果を手元の元PDFと突き合わせて解釈できる。復元機能は設けず、元PDFを手元に保持する運用前提のシンプルな片方向マスキングに絞り込み。外部通信なし・LLM未使用の完全ローカル処理。",
        "background": "決算報告書ReaderにPDFを投入する際、ISMS・セキュリティ観点から機密情報をそのままAIに渡すリスクが課題だった。同一文字列を同一トークンに決定論的に置換することで、AIが関係性を正しく分析でき、かつユーザーは手元の元PDFと突き合わせて結果を解釈できる。復元キーJSON・処理ログ・復元タブは元PDFが手元に残るため不要と判断し削除、シンプルな片方向マスキングに絞り込んだ。",
        "tools": [
          "Python 3.13",
          "Streamlit",
          "pymupdf（fitz）",
          "GiNZA（日本語NER）",
          "re（Python標準ライブラリ・正規表現）",
          "Codex CLI（セキュリティレビュー）"
        ],
        "impact": {
          "before": "決算書PDFの機密情報を手作業で確認・黒塗りするか、リスクを承知でそのままAIに投入",
          "after": "ローカルツールで自動検出・マスキング → 安全にAI投入 → AI分析結果を手元の元PDFと照合",
          "savedTime": "手作業マスキングの工数削減＋セキュリティリスク低減"
        }
      }
    },
    {
      "name": "SEO記事作成ワークフロー",
      "nameEn": "SEO Article Creation Workflow",
      "category": "document",
      "status": "live",
      "description": "記事制作会社のWordブリーフを添付するだけで、SEO×AEO最適化された記事を自動執筆して『_完成稿.docx』として返す、Claude Cowork上のスキル化された一気通貫ワークフロー",
      "detail": {
        "overview": "記事制作会社からWordブリーフ（執筆指示書）が届くたびに、Claude（AIアシスタント）が水色テキストで書かれた指示を自動で読み取り、SEO（検索エンジン最適化）とAEO（生成AIに引用されるための最適化）の両方に対応した記事を自動執筆してWordファイルに書き込んで返す、一気通貫の記事制作ワークフロー。Wordファイルを添付して『作成してください』と依頼するだけで、各セクションを完成稿として執筆し、文字数を確認した上で『_完成稿.docx』として返却する。",
        "background": "支援先企業の問い合わせ獲得を目的とした記事作成をChatGPTで運用していたが、（1）AEO対策（生成AIに引用される対策）の組織的なルール化、（2）会社情報の正確性管理（会社実績数値の出典確認）、（3）経営層のNotion（社内ナレッジツール）参照の必須化、（4）文字数や禁止表現の手動管理の自動化、（5）Claude Coworkへのプラットフォーム移行、の5つの課題を一気通貫で解決するためにスキル（Claude Cowork上で動く専用ワークフロー）として再設計した。",
        "tools": [
          "Claude Cowork（記事執筆・スキル実行環境）",
          "python-docx（Wordブリーフ解析・完成稿書き込み）",
          "Notion（経営層ナレッジページの参照）",
          "Chrome（Claude in Chrome、参照URLの内容取得）"
        ],
        "impact": {
          "before": "ChatGPTで記事作成。AEO固定フレーズ管理・会社情報の正確性確認・文字数カウントを毎回手動で行う必要があり、品質のばらつきが生じていた",
          "after": "Wordファイルを添付して依頼するだけで、AEO最適化・固定フレーズ厳守・Notion必須参照・文字数カウント・Word書き込みまで自動処理し、『_完成稿.docx』が返却される",
          "savedTime": "手順属人化の解消・記事品質の安定化・プラットフォーム移行に伴う知識/ルールの完全内包"
        }
      }
    },
    {
      "name": "AEO対策記事作成",
      "nameEn": "AEO Article Creation",
      "category": "document",
      "status": "live",
      "description": "生成AI(ChatGPT・Gemini・Claude・Perplexity)に引用・参照されるAEO特化記事を、Claude Coworkスキルで全40本(記事11〜50)・月8本ペースで自動執筆",
      "detail": {
        "overview": "支援先企業のAEO（Answer Engine Optimization、生成AIアシスタント向け最適化）対策記事の執筆プロジェクト。ChatGPT・Gemini・Claude・Perplexityなどの生成AIに「正確な回答の根拠」として引用・参照されることを目的とした記事を、Claude Cowork（AI執筆プラットフォーム）上の専用スキルで自動執筆する。全40本（記事11〜50）を月8本ペースで納品する計画。記事1〜10はプロジェクト開始前に完成済み。5,000字±200字（4,800〜5,200字）・7段落構成・固定文言厳守・GPTZero対策（人間らしい文体）を満たすプレーンテキスト（.txt）として返却する。",
        "background": "一般的なSEO記事とは異なり、AEO記事はAIに『正確な回答の根拠』として引用されることを狙うため特有の課題があった。(1)一貫したルールと固定文言の厳守（会社名の正式表記の統一（英字表記の大文字小文字ルール等）／『構造』→『業務の仕組み』への統一など細かいルールが多数あり手作業ではミスが起きやすい）、(2)文字数管理（5,000字±200字基準に対しファイル保存時にNULバイトが混入すると文字数が実際の2倍近くに誤カウントされる）、(3)GPTZero対策（AI文体として検出されにくい人間らしい文体で初稿から書く必要がある・均一な文長/過度な並列構造/形式的な接続詞の連続を避ける）の3つを一気通貫で解決する必要があった。",
        "tools": [
          "Claude Cowork（AI執筆プラットフォーム・スキル実行環境）",
          "経営層Notionノウハウ集（3,000行超Markdown・Grep検索でE-E-A-T強化）",
          "Python3（bash経由・ファイル保存とNULバイト排除・文字数検証）",
          "メモリシステム（プロジェクトルール・完成稿トラッキング・文体ガイドライン）",
          "コーポレートサイト（最新表現・数値の参照）"
        ],
        "impact": {
          "before": "AEO記事は固定文言・会社名表記ルール・GPTZero対策・文字数管理(NULバイト問題)など細かい要件が多く、手作業ではミス頻発。3,000行超の経営層Notionノウハウ集から関連箇所を手で探すコストも大きかった",
          "after": "Claude Coworkスキルで、ノウハウ抽出(Grep)→執筆→文字数検証(Python3)→ファイル保存→トラッキング更新までを一気通貫で処理。固定文言の漏れ・誤表記もメモリでルール管理し防止",
          "savedTime": "3,000行超Notionからの関連箇所抽出が数秒で完了・固定文言ミスや文字数誤カウント問題を解消・AEO記事品質を安定化"
        }
      }
    },
    {
      "name": "経営管理部Q&A蓄積ナレッジ化",
      "nameEn": "Management Dept Q&A Knowledge Base",
      "category": "knowledge",
      "status": "live",
      "description": "経営管理部に集中するバックオフィス質問を自動収集・構造化蓄積し、最終的に既存社内AIチャットボットが自動回答する状態へ段階移行するシステム",
      "detail": {
        "overview": "支援先企業社員からの経理・労務・総務・契約・システム等バックオフィス質問を、Microsoft Forms入力→Power Automateによる質問の登録と通知→SharePointへ構造化蓄積→担当部署へTeams通知→回答管理、までを自動化します。最終的には既存社内AIチャットボット「社内AIチャットボット」が過去ナレッジを参照して自動回答する状態を目指し、Phase1 蓄積→Phase2 検索→Phase3 AI自動回答の3段階で段階移行します。",
        "background": "経営管理部の特定メンバーに同じ質問が繰り返し集中し、属人化と質問履歴の散在が課題でした。当初ChatGPTで作成した初期構想はPower Automate Premium（有償の高機能版）を前提としていましたが、ライセンス未契約のため標準コネクタのみで再設計が必要でした。Claude CodeとCodexで4ラウンドの設計レビューを実施し最終スコア9.9/10まで詰めて仕様書v1.1を確定。その後、実装/運用負荷を最小化するためB案（標準MVP）を採用し、仕様書v2.0で-60〜65%削減（マスキング機能廃止/フロー6本→4本/リスト5→1+ライブラリ/列35→22/Forms 11項目→7項目）を確定しました。",
        "tools": [
          "Microsoft Forms（アンケートフォーム・組織内サインイン必須で質問者メアド/表示名を自動取得）",
          "Power Automate Standard（Microsoftの業務自動化ツール・4フロー構成・プレミアムコネクタ不要）",
          "SharePoint（社内データ保管ツール・Q&A管理リスト22列+営業日カレンダー+ナレッジ世代ライブラリ）",
          "Microsoft Teams（社内チャット・標準コネクタでDM通知）",
          "社内AIチャットボット（週次でナレッジtxtを手動アップロード）",
          "PnP PowerShell（SharePoint自動構築スクリプト）"
        ],
        "impact": {
          "before": "経営管理部の特定メンバーに質問が集中し、同じ質問の繰り返し対応で工数が逼迫。質問履歴はTeamsチャット・口頭・メールに散在し検索不可。AIチャットボットへの学習投入もできない状態。",
          "after": "全質問が構造化された状態でSharePointに自動蓄積。Phase1は担当部署に通知が一括集約され、SLA違反は日次09:00に自動検知。担当部署がナレッジ化判断時にAIBlockedフラグ（AI投入可否）とKnowledgeBody（汎用化済み本文）を設定すれば、日次23:00にナレッジtxtが自動生成され、Phase3で自動回答化を実現予定。",
          "savedTime": "経営管理部の質問応答時間を60%削減目標、月間Q&A50件以上の蓄積でナレッジ資産化"
        }
      }
    },
    {
      "name": "Outlook特定差出人＋件名キーワード → Teams 通知（絞り込み版）",
      "nameEn": "Outlook Sender + Subject-Keyword Filter → Teams Notification",
      "category": "notification",
      "status": "live",
      "description": "特定の差出人から届いたメールのうち、件名に指定キーワードを含むものだけをTeams個人チャットへ自動通知（Power Automate標準コネクタのみ・プレミアム不要）",
      "detail": {
        "overview": "既存の「特定差出人通知システム」の進化版。特定の差出人から届いたメールの中から、さらに件名に特定のキーワードを含むメールだけに絞り込んで本人のTeams個人チャットへ即時通知する。差出人の指定に加え、件名キーワードの「どちらかを含む（OR）」判定を追加した点が特徴。",
        "background": "特定差出人通知システムを社内共有したところ、『特定の差出人かつ件名に特定ワードを含むメールだけ拾いたい』という引き合いが発生。大量に届くメールの中から本当に見たいものだけを通知するニーズに対応した。",
        "tools": [
          "Power Automate（Microsoftの業務自動化ツール・標準コネクタのみ／プレミアム不要）",
          "Office 365 Outlook（特定差出人のメール受信トリガー）",
          "Microsoft Teams（Flow botからの個人チャット通知）"
        ],
        "impact": {
          "before": "大量に届くメールから、特定の相手の特定の件名のメールを目視で探す → 見落とし・対応遅れのリスク",
          "after": "差出人と件名キーワードの両条件に合致したメールだけTeamsにDM通知 → 本当に必要なメールだけを確実に把握",
          "savedTime": "メール監視の心理的負荷を軽減し、重要メールの見落としをゼロに近づける"
        }
      }
    },
    {
      "name": "Outlook特定差出人 → Teams 通知システム",
      "nameEn": "Outlook Sender Filter → Teams Notification",
      "category": "notification",
      "status": "live",
      "description": "特定の差出人アドレスからメールが届いた瞬間に、依頼者本人のTeams個人チャットへアラートを自動通知（Power Automate標準コネクタのみ）",
      "detail": {
        "overview": "社内メンバーから個別依頼を受け、特定の差出人からのメールが届いたときに本人のTeamsへ即時通知する仕組み。Outlookトリガー＋Teams投稿の2ステップで構築可能。",
        "background": "Chatwork→Teams通知の応用。返信遅延・見落とし防止のためメール版のニーズが発生。",
        "tools": [
          "Power Automate（Microsoftの業務自動化ツール・標準コネクタのみ）",
          "Office 365 Outlook（メール受信トリガー）",
          "Microsoft Teams（Flow botからの個人チャット通知）"
        ],
        "impact": {
          "before": "重要メールを定期的にチェック → 見落とし・対応遅延のリスク",
          "after": "Teamsに即時通知 → 件名・差出人・本文プレビューを瞬時に把握",
          "savedTime": "メール確認の心理的負荷を軽減・対応速度を向上"
        }
      }
    },
    {
      "name": "AI最新情報 毎朝レポート",
      "nameEn": "Daily AI News Report",
      "category": "report",
      "status": "live",
      "description": "AIインテグレーターとして必要な最新情報（生成AIの動向・他社事例・経理AI活用・プロスキル・ツールアップデート）を毎朝Notionに自動集約するクラウド常時稼働ブリーフィング",
      "detail": {
        "overview": "毎朝7時に、AIインテグレーターとして必要な6カテゴリの情報（①生成AIの活用・最新情報 ②他社のAI活用事例 ③バックオフィス（経理）でのAI活用事例 ④プロスキル情報 ⑤次に作れるもののアドバイス ⑥Dify・Make・Power Automate等のツール最新情報）をAIがWeb検索で収集・精査し、専門用語に解説を添えた読みやすい文章でNotionの専用ページに自動保存する。カテゴリ1の冒頭には、Anthropic公式ドキュメント由来の「本日のClaudeアップデート」を必ず1件掲載するルール。",
        "background": "AIインテグレーターは生成AI・ノーコードツール・他社事例など広範な領域の最新動向を継続的に把握しておく必要があり、毎朝の情報収集を手動で行うと数十分かかっていた。既存プロジェクトの改善ヒントや構想中プロジェクトの実現アイデアを得るためにも、日次の網羅的なインプットが不可欠。元々はClaude Cowork（チャット型のClaudeアプリ）のスケジュール機能で運用していたが、Coworkはアプリを起動していないと動かないため、PCを開かない日や起動忘れで日次ブリーフィングが欠損するリスクがあった。Claude Code Routines（Anthropicのクラウドで常時稼働するエージェント基盤）に移行することで、PCの状態に依存せず確実に毎朝実行される運用に切り替えた。",
        "tools": [
          "Claude Code Routines（Anthropicのクラウドで常時稼働するエージェント基盤）",
          "Claude Sonnet 4.6（情報の収集・要約・文章生成を行うAI）",
          "WebSearch（6カテゴリのAI関連情報を自動検索）",
          "Notion MCP（収集結果を毎日Notionの専用ページに自動保存）",
          "Anthropic公式ドキュメント（docs.anthropic.com、必須参照先）"
        ],
        "impact": {
          "before": "AI関連の最新情報を朝に手動で複数サイト巡回（20〜30分／日）。Cowork版ではPC起動忘れで日次ブリーフィングが欠損するリスクあり",
          "after": "毎朝7時にクラウドで自動実行され、Notionの専用ページに集約済み。出社前に開くだけで6カテゴリ＋本日のClaudeアップデートを把握できる",
          "savedTime": "情報収集の手間を毎日20〜30分削減 + PC状態に依存しない確実な日次実行"
        }
      }
    },
    {
      "name": "業務ガントチャート自動生成",
      "nameEn": "Monthly Task Gantt Chart Generator",
      "category": "management",
      "status": "live",
      "description": "業務管理ツールの月次業務データをAIが取得し、着手日〜期限日・担当者・クライアントを1画面で見渡せるHTMLガントチャートを自動生成",
      "detail": {
        "overview": "支援先企業の社員が担当する月次業務を、業務管理ツールのデータをもとに1枚のHTMLガントチャートに可視化するツール。着手日〜期限日を横棒で表示し、自分担当・業務委託の区別、クライアント絞り込み、完了チェック（ブラウザに自動保存）などで日々の業務管理を支援する。",
        "background": "業務管理ツールではクライアントごとにページを個別に開かないと、タスクの着手日・期限日・担当者を確認できなかった。複数クライアントを担当する社員は、月次の業務全体像を一目で把握する手段がなかった。",
        "tools": [
          "業務管理ツール連携（AI連携口）",
          "Claude（AIアシスタント）",
          "HTML / JavaScript",
          "localStorage（ブラウザ内のデータ保存機能）",
          "Claudeプロジェクト"
        ],
        "impact": {
          "before": "クライアントごとに業務管理ツールを個別に開いて確認（10社なら10回・月30〜50分）",
          "after": "1画面で全クライアントの月次業務を一覧確認（1〜2分）",
          "savedTime": "1社員あたり月約28〜48分・年間約6〜10時間削減（全20名で年間約120〜200時間）"
        }
      }
    },
    {
      "name": "定例予定オートメーカー",
      "nameEn": "Recurring Schedule Auto-Maker",
      "category": "management",
      "status": "live",
      "description": "毎月「第N営業日」に発生する定例業務を、AIが事前計算した確定日付マスタ(Excel)からPower AutomateでOutlookカレンダーに出席者付き(招待・出欠あり)で一括登録",
      "detail": {
        "overview": "毎月決まった営業日（第3営業日・第10営業日など、業務ごとにバラバラ）に発生する定例業務を、AI(Claude)が祝日込みで事前に正しい確定日付を計算したExcelマスタから、Power Automateが1行ずつOutlookカレンダーへV4で作成し、出席者へ招待(出欠あり)を送る。営業日計算はマスタ生成時に確定させ、フローは『マスタを読んで転記する』だけに単純化。件名末尾の[AUTO:一意キー]＋当日取得＋未存在条件で再実行時の二重登録を防ぐ。",
        "background": "Outlook標準の繰り返しでは「第N営業日」を指定できず、毎月手作業で定例予定を登録していた。営業日は業務ごとに異なり、祝日が月上旬に入ると営業日がずれるため計算ミスも起きやすい。出席者への招待(出欠)も確実に飛ばしたい。",
        "tools": [
          "Power Automate（Microsoftの業務自動化ツール）",
          "Office 365 Outlook（カレンダー/イベント作成V4）",
          "Excel Online / SharePoint（予定マスタ）",
          "Python（確定日付マスタ生成）",
          "Claude（営業日・確定日付の計算）"
        ],
        "impact": {
          "before": "毎月手作業で複数の定例予定をカレンダー登録（第N営業日の計算・祝日ずれ確認・出席者招待を都度手作業）",
          "after": "AIが6か月分の確定日付マスタを生成→Power Automateを1回実行で全件を招待付き一括登録",
          "savedTime": "毎月の定例予定登録の手作業を削減＋営業日・祝日の計算ミス防止"
        }
      }
    }
  ]
};
