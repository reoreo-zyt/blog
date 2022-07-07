<template>
  <div class="hello">
    <!-- <h1 style="color: #1ed0d0;">{{ titleMsg }}</h1> -->
    <div class="wrapper">
      <h2><strong>文章</strong></h2>
      <div>
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

      <!-- <h2>
        <strong>demo</strong>
      </h2>

      <div class="cards">
        <figure class="card">
          <img src="https://mrreiha.keybase.pub/codepen/hover-fx/1.jpg" />

          <figcaption>Dota 2</figcaption>
        </figure>

        <figure class="card">
          <img src="https://mrreiha.keybase.pub/codepen/hover-fx/2.jpg" />

          <figcaption>Stick Fight</figcaption>
        </figure>

        <figure class="card">
          <img src="https://mrreiha.keybase.pub/codepen/hover-fx/3.jpg" />

          <figcaption>Minion Masters</figcaption>
        </figure>

        <figure class="card">
          <img src="https://mrreiha.keybase.pub/codepen/hover-fx/4.jpg" />

          <figcaption>KoseBoz!</figcaption>
        </figure>
      </div> -->

      <h2>
        <strong>计划中<span></span>...</strong>
      </h2>

      <div class="news" v-for="(data, index) in demoData" v-bind:key="index">
        <figure class="article">
          <img :src="data.imgUrl" />

          <figcaption>
            <h3>{{ data.name }}</h3>

            <p>
              {{ data.desc }}
            </p>
          </figcaption>
        </figure>

        <!-- <figure class="article">
          <img src="https://mrreiha.keybase.pub/codepen/hover-fx/news2.png" />

          <figcaption>
            <h3>Update</h3>

            <p>
              Just in time for Lunar New Year and the Rat’s time in the cyclical
              place of honor, the Treasure of Unbound Majesty is now available.
            </p>
          </figcaption>
        </figure>

                <figure class="article">
          <img src="https://mrreiha.keybase.pub/codepen/hover-fx/news2.png" />

          <figcaption>
            <h3>Update</h3>

            <p>
              Just in time for Lunar New Year and the Rat’s time in the cyclical
              place of honor, the Treasure of Unbound Majesty is now available.
            </p>
          </figcaption>
        </figure> -->
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
    };
  },
  created() {
    let s1 = setInterval(() => {
      if (this.calc < 3) {
        this.titleMsg += ".";
        this.calc++;
      }
      if (this.calc == 3) {
        clearInterval(s1);
      }
    }, 500);
    this.receiveAllArticle();
    this.receiveAllDemo();
  },
  methods: {
    getLocalTime(n) {
      n = n + "000";
      return new Date(parseInt(n)).toLocaleString().replace(/:\d{1,2}$/, " ");
    },
    receiveAllArticle() {
      // 获取所有的文章
      fetch("http://localhost:80/api/v1/main/homeworkList?page=1&limit=99999")
        .then((response) => response.json())
        .then((res) => {
          this.articleData = res.data;
          this.nameArray = Array.from(
            new Set(
              this.articleData
                .map((item) => item.name)
                .join(";")
                .split(";")
                .sort()
            )
          );
          // for (let i = 0; i < this.nameArray.length; i++) {
          //   fetch(
          //     `http://localhost:5301/api/v1/main/findTagId?name=${this.nameArray[i]}`
          //   )
          //     .then((response) => response.json())
          //     .then((res) => {
          //       console.log(res);
          //     });
          // }
          // console.log(this.articleData);
          // console.log(this.nameArray);
          // this.result = [this.nameArray.length][this.articleData.length]
          // this.result[0][0] = 1
          let result = new Array(this.nameArray.length);
          // TODO: 复杂度高，后续考虑重写数据库，标签和文章的关系重写
          for (let i = 0; i < this.nameArray.length; i++) {
            result[i] = new Array(this.articleData.length);
            for (let j = 0; j < this.articleData.length; j++) {
              if (
                this.articleData[j].name.indexOf(`${this.nameArray[i]}`) != -1
              ) {
                result[i][j] = this.articleData[j];
              }
            }
          }
          this.result = result;
          // console.log(this.result);
        });
    },
    receiveAllDemo() {
      fetch("http://localhost:80/api/v1/main/getDemo")
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
  background: linear-gradient(
    to top,
    transparent,
    #fff 15%,
    rgba(255, 255, 255, 0.5)
  );
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
</style>
