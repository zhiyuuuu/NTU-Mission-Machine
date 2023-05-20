## NTU Mission Machine
- Deployed service 網址：[NTU Mission Machine](https://ntu-mission-machine-production-f1a7.up.railway.app)

- Github Repo 網址 : [Github 連結](https://github.com/yclee6262/wp1111/tree/main/final)

- Demo 影片網址: [Demo 連結](https://drive.google.com/file/d/1nRk1ngi2AY7hbtWIPqZR8g4X6HqAqFdw/view?usp=sharing)
- FB 社團貼文網址: [FB 貼文連結](https://www.facebook.com/groups/NTURicWebProg/permalink/1828600490821196/)
- 服務內容
    - 簡介：
        - 【NTU Mission Machine】是一個匿名讓大家發布任務和接任務的平台，當初發想就是因為每天在交流板都能看到許多各式各樣奇怪的需求，但我們想或許有許多人會礙於種種因素不敢公開發文徵求幫助，所以我們設計了這個平台來解決這個問題，同時創立一個較乾淨的空間讓大家來做任務媒合。
    - 功能：
        - 註冊 / 登入：讓使用者能夠依照 Username 和對應的 Password 去登入平台，沒有帳號的話就要先註冊一個才能開始使用
        - 發布任務：首頁的最上方會有一個類似臉書的發文框，輸入任務名稱、細節、報酬以及需求時間即可發布任務徵人
        - 瀏覽所有任務：在主畫面會將所有任務依照發布的時間順序呈現出來，如大部分的社交軟體一樣，將最新的任務放在最上面
        - 查看詳細任務資訊：每個任務都可以點擊查看詳細資訊，但不同身分的人看會有不一樣的功能按鈕
        - 接任務：用戶進入詳細任務頁面後，若不是該任務的發文者，即可點擊按鈕接任務
查看發布的任務：在主畫面左邊點擊「我發布的任物」選項即可跳轉到查看所有自己發布的任務之頁面
        - 查看接到的任務：在主畫面左邊點擊「我接到的任物」選項即可跳轉到查看所有自己目前接到的任務之頁面
        - 查看目前手邊任務數量：在主畫面右上角會顯示一個 `Ongoing Task` 的計數器，代表的是用戶目前手邊接到但尚未完成的任務數量
        - 完成任務：點進我接到的任務的詳細頁面後，底下的按鈕會依據任務完成與否有不一樣的圖樣，若是未完成，點擊按鈕即可更新任務完成狀態
        - 登出：點擊畫面左邊的「登出」即會回到登入頁面

- 如何在 localhost 安裝與測試之詳細步驟
1. 在 `final/NTU_Mission_Machine/backend` ，根據`.env.defaults`新增一個 `.env` 檔。 (請記得加上 `MODE=Reset`)
1. 在 `final/NTU_Mission_Machine`,使用 `yarn install` 來安裝套件
1. 在 `final/NTU_Mission_Machine/backend`,使用 `yarn install` 來安裝套件
1. 在 `final/NTU_Mission_Machine/frontend`,使用 `yarn install` 來安裝套件
1. 在 `final/NTU_Mission_Machine/backend`,使用 `yarn server` 來開啟 server
1. 在 `final/NTU_Mission_Machine/frontend`,使用 `yarn start` 來開啟 App
1. 做完上述步驟後，應會在`localhost:3000`顯示網頁

- 每位組員之負責項目 (請詳述)
    - 李彥澂 : 前端、API串接
    - 劉芷瑜 : 後端、API串接、網頁排版修改

- 其他想提醒老師與助教評分之事項
    - 我們有 default 生成一些資料上去，所以一開始打開時主畫面有資料是正常的
