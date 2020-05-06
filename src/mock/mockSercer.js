// 引入
import Mock from "mockjs";
import banners from "./banners.json"
import floors from "./floors.json"

// 使用
Mock.mock("/mock/banners", {code:200, data:banners})
Mock.mock("/mock/floors", {code:200, data:floors})

console.log("mockServer执行")