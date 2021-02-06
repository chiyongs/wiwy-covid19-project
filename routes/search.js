const express = require("express");
const router = express.Router();
const path = require("path");
let client = require("cheerio-httpcli");

/* GET users listing. */
router.post("/search_process", (req, res, next) => {
  const post = req.body;
  const searchTitle = post.searchTitle;
  //   (searchTitle) => {
  //     let searchResult = {
  //       lstOfText: [],
  //       lstOfLink: [],
  //     };
  //     client.fetch(
  //       "http://www.google.com/search",
  //       { q: filteredTitle },
  //       (err, $, response, body) => {
  //         // console.log(body); -> 제대로 출력이 되는지 확인하기 위해서 작성
  //         //div yuRUbf의 클래스 안에있는 것들 서치
  //         let aList = $("div.yuRUbf").find("a");
  //         for (let i = 0; i < aList.length; i++) {
  //           searchResult.lstOfText.push($(aList[i]).text());
  //           searchResult.lstOfLink.push($(aList[i]).attr("href"));
  //           //   linkList[i] = $(aList[i]).attr("href");
  //           //   console.log($(aList[i]).text()); //yuRUbf안에 있는 텍스트 출력
  //           //   console.log($(aList[i]).attr("href")); //링크 출력
  //         }
  //         //   return searchResult;
  //         res.json(searchResult);
  //       }
  //     );
  //   };
  res.redirect(`/search/${searchTitle}`);
});

router.get("/searchAPI/:searchTitle", (req, res, next) => {
  let searchResult = {
    lstOfText: [],
    lstOfLink: [],
  };
  if (searchResult !== undefined) {
    client.fetch(
      "http://www.google.com/search",
      { q: searchTitle },
      (err, $, response, body) => {
        // console.log(body); -> 제대로 출력이 되는지 확인하기 위해서 작성
        //div yuRUbf의 클래스 안에있는 것들 서치
        let aList = $("div.yuRUbf").find("a");
        for (let i = 0; i < aList.length; i++) {
          searchResult.lstOfText.push($(aList[i]).text());
          searchResult.lstOfLink.push($(aList[i]).attr("href"));
          //   linkList[i] = $(aList[i]).attr("href");
          //   console.log($(aList[i]).text()); //yuRUbf안에 있는 텍스트 출력
          //   console.log($(aList[i]).attr("href")); //링크 출력
        }
        //   return searchResult;
        res.json(searchResult);
      }
    );
  } else {
    res.redirect("/");
  }
});
router.get("/:searchTitle", (req, res, next) => {
  const filteredTitle = path.parse(req.params.searchTitle).base;

  let searchResult = {
    lstOfText: [],
    lstOfLink: [],
  };
  client.fetch(
    "http://www.google.com/search",
    { q: filteredTitle },
    (err, $, response, body) => {
      // console.log(body); -> 제대로 출력이 되는지 확인하기 위해서 작성
      //div yuRUbf의 클래스 안에있는 것들 서치
      let aList = $("div.yuRUbf").children("a");
      let h3List = aList.children("h3");
      for (let i = 0; i < aList.length; i++) {
        searchResult.lstOfText.push($(h3List[i]).text());
        searchResult.lstOfLink.push($(aList[i]).attr("href"));
        //   linkList[i] = $(aList[i]).attr("href");
        //   console.log($(aList[i]).text()); //yuRUbf안에 있는 텍스트 출력s
        //   console.log($(aList[i]).attr("href")); //링크 출력s\
      }
      //   return searchResult;
      //   res.send(searchResult);
      res.render("searchView", {
        searchResult: searchResult,
        keyword: filteredTitle,
      });
    }
  );
  //   console.log(result);
  //   console.log(searchResult);
  //   res.send();
});
module.exports = router;
