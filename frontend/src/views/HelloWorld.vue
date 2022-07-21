<template>
  <div class="hello">
    <div class="wrapper" style="display: flex;flex-direction: column;">
      <div style="display:flex;justify-content:space-around;align-items: center;margin-bottom: 100px;">
        <div class="left" @click="changeViewStyle()">
          <div class="tag-container">
            <div class="tag">
              <div class="tag-side tag-1-side">
                <div class="tag-1-top"></div>
                <div class="tag-text tag-1-text">
                  文 章
                  <div class="rule-shape rule-red">&starf;</div>
                </div>
              </div>
              <div class="tag-side tag-1-side is-back">
                <div class="tag-1-top"></div>
                <div class="tag-text tag-1-text">
                  点击切换为标签分类
                  <div class="rule-shape">&starf;</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div v-if="tagType">
            <div v-for="(item, i) in result" v-bind:key="i">
              <h3 style="color: #1ed0d0">{{ `${nameArray[i]}` }}</h3>
              <div v-for="(aitem, j) in item" v-bind:key="j" style="margin: 20px 0">
                <div v-if="aitem != null">
                  <router-link :to="{ path: '/article', query: { id: aitem.id } }">
                    <span style="margin: 0 20px; color: #247777; cursor: pointer">{{
                        aitem.title
                    }}</span>
                  </router-link>
                  <span>发布时间：{{ getLocalTime(aitem.created_on) }}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="commonType">
            <div v-for="(item, index) in articleData" v-bind:key="index">
              <div style="margin: 20px 0">
                <router-link :to="{ path: '/article', query: { id: item.id } }">
                  <span style="margin: 0 20px; color: #247777; cursor: pointer">{{
                      item.title
                  }}</span>
                </router-link>
                <span>发布时间：{{ getLocalTime(item.created_on) }}</span>
                <!-- <span class="tags" v-for="(aitem, index) in item.name.split(';')" v-bind:key="index">
                  <span class="tag">{{ aitem }}</span>
                </span> -->
                <span class="a_tag-wrap" v-for="aitem in item.name.split(';')" v-bind:key="aitem">
                  <span class="a_tag" data-number="🔖" @click="changeViewStyle()">{{ aitem }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="display:flex;justify-content:space-around; align-items:center;">
        <div class="tag-container">
          <div class="tag">
            <div class="tag-side tag-2-side">
              <div class="tag-text tag-2-text">
                unity<br />
                <div class="rule-diagonal"></div>
              </div>
            </div>
            <div class="tag-side tag-2-side is-back">
              <div class="tag-text tag-2-text">
                练习 demo，独立游戏开发进度 0%...
                <div class="rule-diagonal"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="news">
          <figure class="article" v-for="(data, index) in demoData" v-bind:key="index">
            <img v-lazy="data.imgUrl" />
            <figcaption>
              <h3>{{ data.name }}</h3>
              <p>
                {{ data.desc }}
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: ".",
      titleMsg: "致力于个人独立游戏开发",
      calc: 0,
      articleData: undefined,
      nameArray: undefined,
      result: undefined,
      demoData: undefined,
      tagType: false,
      commonType: true,
    };
  },
  created() {
    this.receiveAllArticle();
    this.receiveAllDemo();
  },
  methods: {
    getLocalTime(n) {
      n = n + "000";
      return new Date(parseInt(n)).toLocaleString().replace(/:\d{1,2}$/, " ");
    },
    changeToTag() {
      this.nameArray = Array.from(
        new Set(
          this.articleData
            .map((item) => item.name)
            .join(";")
            .split(";")
            .sort()
        )
      );
      let result = new Array(this.nameArray.length);
      // TODO: 复杂度高，后续考虑重写数据库，标签和文章的关系重写
      for (let i = 0; i < this.nameArray.length; i++) {
        result[i] = new Array(this.articleData.length);
        for (let j = 0; j < this.articleData.length; j++) {
          if (this.articleData[j].name.indexOf(`${this.nameArray[i]}`) != -1) {
            result[i][j] = this.articleData[j];
          }
        }
      }
      this.result = result;
    },
    changeViewStyle() {
      this.changeToTag();
      this.tagType = !this.tagType;
      this.commonType = !this.commonType;
    },
    receiveAllArticle() {
      // 获取所有的文章
      fetch(
        process.env.VUE_APP_API_BASE_URL +
        "/api/v1/main/GetArticleAllExceptContent"
      )
        .then((response) => response.json())
        .then((res) => {
          this.articleData = res.data;
        });
    },
    receiveAllDemo() {
      fetch(process.env.VUE_APP_API_BASE_URL + "/api/v1/main/getDemo")
        .then((response) => response.json())
        .then((res) => {
          this.demoData = res.data;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

<style scoped>
.abs,
h2:after,
.cards .card figcaption,
.cards .card:after,
.news .card figcaption,
.news .card:after,
.news .article figcaption {
  position: absolute;
}

.rel,
h2,
h2 strong,
.cards .card,
.news .card,
.news .article {
  position: relative;
  color: #1ed0d0;
}

.fix {
  position: fixed;
}

.dfix {
  display: inline;
}

.dib {
  display: inline-block;
}

.db {
  display: block;
}

.dn {
  display: none;
}

.df,
.cards,
.news {
  display: flex;
}

.dif {
  display: inline-flex;
}

.dg {
  display: grid;
}

.dig {
  display: inline-grid;
}

.vm,
h2,
h2 strong,
h2 span {
  vertical-align: middle;
}

body {
  background: #24282f;
  font-family: "Alegreya Sans";
}

.wrapper {
  padding: 15px;
}

h2 {
  padding: 10px;
  padding-left: 25px;
  color: #ccc;
  margin: 0;
}

h2 strong {
  z-index: 2;
  background: #24282f;
  padding: 4px 8px;
}

h2 span {
  font-size: 0.7em;
  color: #aaa;
  margin-left: 10px;
}

h2:after {
  content: "";
  z-index: 1;
  bottom: 50%;
  margin-bottom: -2px;
  height: 2px;
  left: 0;
  right: 0;
  background: #373d47;
}

.cards,
.news {
  flex-flow: row wrap;
}

.cards .card,
.news .card {
  margin: 20px;
  width: 180px;
  height: 270px;
  overflow: hidden;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.8);
  transform-origin: center top;
  transform-style: preserve-3d;
  transform: translateZ(0);
  transition: 0.3s;
}

.cards .card img,
.news .card img {
  width: 100%;
  min-height: 100%;
}

.cards .card figcaption,
.news .card figcaption {
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  padding-bottom: 10px;
  font-size: 20px;
  background: none;
  color: #fff;
  transform: translateY(100%);
  transition: 0.3s;
}

.cards .card:after,
.news .card:after {
  content: "";
  z-index: 10;
  width: 200%;
  height: 100%;
  top: -90%;
  left: -20px;
  opacity: 0.1;
  transform: rotate(45deg);
  background: linear-gradient(to top,
      transparent,
      #fff 15%,
      rgba(255, 255, 255, 0.5));
  transition: 0.3s;
}

.cards .card:hover,
.news .card:hover,
.cards .card:focus,
.news .card:focus,
.cards .card:active,
.news .card:active {
  box-shadow: 0 8px 16px 3px rgba(0, 0, 0, 0.6);
  transform: translateY(-3px) scale(1.05) rotateX(15deg);
}

.cards .card:hover figcaption,
.news .card:hover figcaption,
.cards .card:focus figcaption,
.news .card:focus figcaption,
.cards .card:active figcaption,
.news .card:active figcaption {
  transform: none;
}

.cards .card:hover:after,
.news .card:hover:after,
.cards .card:focus:after,
.news .card:focus:after,
.cards .card:active:after,
.news .card:active:after {
  transform: rotate(25deg);
  top: -40%;
  opacity: 0.15;
}

.news .article {
  overflow: hidden;
  width: 350px;
  height: 235px;
  margin: 20px;
}

.news .article img {
  width: 100%;
  min-height: 100%;
  transition: 0.2s;
}

.news .article figcaption {
  font-size: 14px;
  text-shadow: 0 1px 0 rgba(51, 51, 51, 0.3);
  color: #fff;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 40px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  background: rgba(6, 18, 53, 0.6);
  opacity: 0;
  transform: scale(1.15);
  transition: 0.2s;
}

.news .article figcaption h3 {
  color: #3792e3;
  font-size: 16px;
  margin-bottom: 0;
  font-weight: bold;
}

.news .article:hover img,
.news .article:focus img,
.news .article:active img {
  filter: blur(3px);
  transform: scale(0.97);
}

.news .article:hover figcaption,
.news .article:focus figcaption,
.news .article:active figcaption {
  opacity: 1;
  transform: none;
}

.tags {
  flex-wrap: wrap;
  -webkit-box-pack: center;
  justify-content: center;
  display: -webkit-box;
  display: flex;
}

/* Shared */
.tag-container {
  width: 200px;
  height: 300px;
  margin: 20px;
  position: relative;
  -webkit-perspective: 800px;
  perspective: 800px;
}

.tag {
  width: 100%;
  height: 100%;
  position: absolute;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transition: -webkit-transform 1s;
  transition: -webkit-transform 1s;
  transition: transform 1s;
  transition: transform 1s, -webkit-transform 1s;
}

.tag-container:hover .tag {
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
}

.tag-side {
  width: 100%;
  height: 100%;
  position: absolute;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
}

.tag-side.is-back {
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
  z-index: 2;
}

.tag-text {
  width: 100%;
  padding: 0 20px;
  color: #222;
  font: 28px 'Sacramento', cursive;
  text-align: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

/* Tag 1 */
.tag-1-side:before {
  content: " ";
  background: #fff;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  position: absolute;
  top: 30px;
  left: 50%;
  z-index: 1;
  -webkit-transform: translate3d(-50%, 0, 0);
  transform: translate3d(-50%, 0, 0);
}

.tag-1-top {
  width: 100%;
  margin-top: -35px;
  position: absolute;
  top: 0;
  -webkit-transform: scale(0.775, 0.5) translate3d(0, 0, 0);
  transform: scale(0.775, 0.5) translate3d(0, 0, 0);
}

.tag-1-top:before {
  content: " ";
  background: #ede5d8;
  padding-bottom: 200px;
  border-bottom-left-radius: 30px;
  border-top-left-radius: 10px;
  border-top-right-radius: 30px;
  display: block;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

.tag-1-side.is-back .tag-1-top:before {
  background: #e44f47;
}

.tag-1-text {
  background: #ede5d8;
  margin-top: 65px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding-top: 30px;
  position: relative;
  z-index: 1;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.tag-1-side.is-back .tag-1-text {
  background: #e44f47;
  color: #fff;
}

/* Tag 2 */
.tag-2-side:before,
.tag-2-side:after {
  content: " ";
  background: #b6dfde;
  height: 50px;
  position: absolute;
  top: 0;
  left: 50px;
  right: 50px;
  -webkit-transform: skew(-45deg) translate3d(0, 0, 0);
  transform: skew(-45deg) translate3d(0, 0, 0);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}

.tag-2-side.is-back:before,
.tag-2-side.is-back:after {
  background: #47ada0;
}

.tag-2-side:after {
  -webkit-transform: skew(45deg);
  transform: skew(45deg);
}

.tag-2-text:before {
  content: " ";
  background: #fff;
  width: 27px;
  height: 27px;
  border: 6px solid #47ada0;
  border-radius: 50%;
  position: absolute;
  top: 20px;
  left: 50%;
  z-index: 1;
  -webkit-transform: translate3d(-50%, 0, 0);
  transform: translate3d(-50%, 0, 0);
}

.tag-2-side.is-back .tag-2-text:before {
  border-color: #b6dfde;
}

.tag-2-text {
  background: #b6dfde;
  margin-top: 50px;
  padding-bottom: 30px;
}

.tag-2-side.is-back .tag-2-text {
  background: #47ada0;
}

/* Extras */
.rule-shape {
  width: 100%;
  color: #fff;
  font-size: 34px;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  align-self: flex-end;
}

.rule-shape:before,
.rule-shape:after {
  content: " ";
  background: #fff;
  height: 1px;
  margin-bottom: 8px;
  display: block;
  -webkit-box-flex: 2;
  flex-grow: 2;
}

.rule-shape:before {
  margin-right: 6.25px;
}

.rule-shape:after {
  margin-left: 6.25px;
}

.rule-red {
  color: #e44f47;
}

.rule-red:before,
.rule-red:after {
  background: #e44f47;
}

.rule-diagonal {
  background: -webkit-repeating-linear-gradient(45deg,
      #e44f47,
      #e44f47 7px,
      transparent 7px,
      transparent 14px,
      #fff 14px,
      #fff 21px,
      transparent 21px,
      transparent 28px);
  background: repeating-linear-gradient(45deg,
      #e44f47,
      #e44f47 7px,
      transparent 7px,
      transparent 14px,
      #fff 14px,
      #fff 21px,
      transparent 21px,
      transparent 28px);
  width: 100%;
  height: 30px;
  position: absolute;
  bottom: 0;
  left: 0;
}

@media screen and (min-width: 0px) and (max-width: 960px) {
  .wrapper .left {
    display: none;
  }

  .tag-container {
    display: none;
  }

  .news {
    display: flex;
    justify-content: center;
  }
}

.a_tag-wrap {
  width: 40%;
  margin: auto;
  margin-top: 5em;
  /* border: 1px solid black; */
  padding: 0.5em;
  -webkit-border-radius: 0.5em;
  -moz-border-radius: 0.5em;
  border-radius: 0.5em;
  /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#e85e605f', endColorstr='#de333333', GradientType=0);
}

.a_tag {
  background: white;
  color: rgba(0, 0, 0, 0.65);
  display: inline-block;
  position: relative;
  z-index: 100;
  padding: 0.25em 0.75em 0.25em 0.5em;
  margin: 0.5em 1.5em 0.5em 0.5em;
  -webkit-border-radius: 3px 0 0 3px;
  -moz-border-radius: 3px 0 0 3px;
  border-radius: 3px 0 0 3px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  font-family: 'Port Lligat Slab', serif;
  text-shadow: 0 1px 1px white;
  cursor: pointer;
  background: #ffffff;
  /* Old browsers */
  /* IE9 SVG, needs conditional override of 'filter' to 'none' */
  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZmZmZmZiIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iI2YxZjFmMSIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjU3JSIgc3RvcC1jb2xvcj0iI2UxZTFlMSIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9Ijk0JSIgc3RvcC1jb2xvcj0iI2QzYzdjMCIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmNmY2ZjYiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);
  background: -moz-linear-gradient(top, #ffffff 0%, #f1f1f1 50%, #e1e1e1 57%, #d3c7c0 94%, #f6f6f6 100%);
  /* FF3.6+ */
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #ffffff), color-stop(50%, #f1f1f1), color-stop(57%, #e1e1e1), color-stop(94%, #d3c7c0), color-stop(100%, #f6f6f6));
  /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(top, #ffffff 0%, #f1f1f1 50%, #e1e1e1 57%, #d3c7c0 94%, #f6f6f6 100%);
  /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(top, #ffffff 0%, #f1f1f1 50%, #e1e1e1 57%, #d3c7c0 94%, #f6f6f6 100%);
  /* Opera 11.10+ */
  background: -ms-linear-gradient(top, #ffffff 0%, #f1f1f1 50%, #e1e1e1 57%, #d3c7c0 94%, #f6f6f6 100%);
  /* IE10+ */
  background: linear-gradient(to bottom, #ffffff 0%, #f1f1f1 50%, #e1e1e1 57%, #d3c7c0 94%, #f6f6f6 100%);
  /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#f6f6f6', GradientType=0);
}

.a_tag:before {
  display: block;
  position: absolute;
  top: 50%;
  right: -1px;
  margin-top: -0.25em;
  content: "";
  height: 0;
  width: 0;
  background: #e6822f;
  width: 0.25em;
  height: 0.5em;
  -webkit-box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.75);
  -moz-box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.75);
  box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.75);
  -webkit-border-radius: 3px 0 0 3px;
  -moz-border-radius: 3px 0 0 3px;
  border-radius: 3px 0 0 3px;
}

.a_tag:after {
  color: white;
  text-shadow: 0 -1px rgba(0, 0, 0, 0.5);
  display: block;
  position: absolute;
  left: 100%;
  top: 0.125em;
  padding: 0.125em 0.25em;
  background: #e6822f;
  content: attr(data-number);
  -webkit-border-radius: 0 3px 3px 0;
  -moz-border-radius: 0 3px 3px 0;
  border-radius: 0 3px 3px 0;
  -webkit-box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  z-index: 0;
}

.a_tag:hover {
  color: black;
}

.a_tag:hover:before,
.a_tag:hover:after {
  background: #c16417;
}
</style>
