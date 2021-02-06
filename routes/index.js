const express = require("express");
const router = express.Router();
const dbConObj = require("../conf/db_info");
const dbconn = dbConObj.init();
let moment = require("moment");
// const calculateSeq = require("../conf/calculateSeq");
const calToday = require("../conf/calToday");
const funcConv = require("../conf/funcConv");
const checkUpdate = require("../conf/checkUpdLog");

function getUpdate(callback) {
  return new Promise((resolve, reject) => {
    checkUpdate();
    resolve();
  });
}

/* GET home page. */
router.get("/", (req, res, next) => {
  let today = moment().format("YYYYMM");
  let curMonth = moment().format("YYYYMM");
  let checkDay = moment().format("DD");
  // const seqNum = calculateSeq();
  const todaySeq = calToday();
  const todaySelect = `SELECT * FROM covid${today} WHERE gubun = '합계' and seq >= '${todaySeq}'`;
  const citySelect = `SELECT defCnt, incDec FROM covid${today} WHERE seq >= '${todaySeq}' and gubun != '합계'`;
  getUpdate().then(() => {
    dbconn.query(todaySelect, (error, totalResults, fields) => {
      dbconn.query(citySelect, (error, cityResults, fields) => {
        res.render("index.html", {
          defCnt: funcConv.defCntConv(totalResults),
          incDec: funcConv.incDecConv(totalResults),
          localOccCnt: funcConv.localOccCntConv(totalResults),
          overFlowCnt: funcConv.overFlowCntConv(totalResults),
          isolClearCnt: funcConv.isolClearCntConv(totalResults),
          isolIngCnt: funcConv.isolIngCntConv(totalResults),
          deathCnt: funcConv.deathCntConv(totalResults),
          /* 여기서부터 시도별 데이터입니다. Cnt는 누적확진자 수, Inc는 전일 대비입니다. */
          seoulCnt: funcConv.defCntConv(cityResults)[0],
          seoulInc: funcConv.incDecConv(cityResults)[0],
          busanCnt: funcConv.defCntConv(cityResults)[1],
          busanInc: funcConv.incDecConv(cityResults)[1],
          daeguCnt: funcConv.defCntConv(cityResults)[2],
          daeguInc: funcConv.incDecConv(cityResults)[2],
          incheonCnt: funcConv.defCntConv(cityResults)[3],
          incheonInc: funcConv.incDecConv(cityResults)[3],
          gwangjuCnt: funcConv.defCntConv(cityResults)[4],
          gwangjuInc: funcConv.incDecConv(cityResults)[4],
          daejeonCnt: funcConv.defCntConv(cityResults)[5],
          daejeonInc: funcConv.incDecConv(cityResults)[5],
          ulsanCnt: funcConv.defCntConv(cityResults)[6],
          ulsanInc: funcConv.incDecConv(cityResults)[6],
          sejongCnt: funcConv.defCntConv(cityResults)[7],
          sejongInc: funcConv.incDecConv(cityResults)[7],
          gyeonggiCnt: funcConv.defCntConv(cityResults)[8],
          gyeonggiInc: funcConv.incDecConv(cityResults)[8],
          gangwonCnt: funcConv.defCntConv(cityResults)[9],
          gangwonInc: funcConv.incDecConv(cityResults)[9],
          chungcheongbukCnt: funcConv.defCntConv(cityResults)[10],
          chungcheongbukInc: funcConv.incDecConv(cityResults)[10],
          chungcheongnamCnt: funcConv.defCntConv(cityResults)[11],
          chungcheongnamInc: funcConv.incDecConv(cityResults)[11],
          jeollabukCnt: funcConv.defCntConv(cityResults)[12],
          jeollabukInc: funcConv.incDecConv(cityResults)[12],
          jeollanamCnt: funcConv.defCntConv(cityResults)[13],
          jeollanamInc: funcConv.incDecConv(cityResults)[13],
          gyeongsangbukCnt: funcConv.defCntConv(cityResults)[14],
          gyeongsangbukInc: funcConv.incDecConv(cityResults)[14],
          gyeongsangnamCnt: funcConv.defCntConv(cityResults)[15],
          gyeongsangnamInc: funcConv.incDecConv(cityResults)[15],
          jejuCnt: funcConv.defCntConv(cityResults)[16],
          jejuInc: funcConv.incDecConv(cityResults)[16],
          lazarettoCnt: funcConv.defCntConv(cityResults)[17],
          lazarettoInc: funcConv.incDecConv(cityResults)[17],
        });
      });
    });
  });
});

module.exports = router;
