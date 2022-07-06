<template>
  <div>
    <div class="header">
      <div class="sides">
        <router-link to="/" class="logo">返回主页</router-link>
      </div>
      <!-- <div class="sides"><a href="#" class="menu"> </a></div> -->
      <div class="info">
        <h4>{{ result.name.split(";").join("📎") }}</h4>
        <h1>{{ result.title }}</h1>
        <div class="meta">
          <a href="https://github.com/reoreo-zyt" target="_b" class="author"></a
          ><br />
          By
          <a href="https://github.com/reoreo-zyt" target="_b">{{
            result.created_by
          }}</a>
          {{ getLocalTime(result.created_on) }}
        </div>
      </div>
    </div>
    <div class="content">
      <!-- TODO: 内容 -->
      <div v-html="content" class="markdown-body"></div>
      <!-- TODO: 评论(github issue) -->
      <!-- <div v-html="content"></div> -->
      <div align="center">
        <a href="https://github.com/reoreo-zyt" class="btn twtr" target="_b"
          >Follow me on Github</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import emoji from "markdown-it-emoji";
import footnote from "markdown-it-footnote";
import katex from "markdown-it-katex";
// import Vditor from "vditor";

export default {
  //   components: {
  //     Markdown,
  //   },
  created() {
    fetch(
      `http://localhost:5301/api/v1/main/homeworkListById?id=${this.$route.query.id}`
    )
      .then((response) => response.json())
      .then((res) => {
        this.result = res.data[0];
        // this.md2html()
        const md = new MarkdownIt({
          html: true,
          linkify: true,
          typographer: true,
          highlight: function (str, lang) {
            // 此处判断是否有添加代码语言
            if (lang && hljs.getLanguage(lang)) {
              try {
                // 得到经过highlight.js之后的html代码
                const preCode = hljs.highlight(lang, str, true).value;
                // 以换行进行分割
                const lines = preCode.split(/\n/).slice(0, -1);
                // 添加自定义行号
                let html = lines
                  .map((item, index) => {
                    return (
                      '<li><span class="line-num" data-line="' +
                      (index + 1) +
                      '"></span>' +
                      item +
                      "</li>"
                    );
                  })
                  .join("");
                html = "<ol>" + html + "</ol>";
                // 添加代码语言
                if (lines.length) {
                  html += '<b class="name">' + lang + "</b>";
                }
                return '<pre class="hljs"><code>' + html + "</code></pre>";
              } catch (__) {}
            }
            // 未添加代码语言，此处与上面同理
            const preCode = md.utils.escapeHtml(str);
            const lines = preCode.split(/\n/).slice(0, -1);
            let html = lines
              .map((item, index) => {
                return (
                  '<li><span class="line-num" data-line="' +
                  (index + 1) +
                  '"></span>' +
                  item +
                  "</li>"
                );
              })
              .join("");
            html = "<ol>" + html + "</ol>";
            return '<pre class="hljs"><code>' + html + "</code></pre>";
          },
        })
          .use(katex)
          .use(emoji)
          .use(footnote);
        // this.content = md.render(`$\\sqrt{3x-1}+(1+x)^2$`);
        this.content = md.render(this.result.content);
      });
  },
  data() {
    return {
      result: undefined,
      content: undefined,
    };
  },
  methods: {
    getLocalTime(n) {
      n = n + "000";
      return new Date(parseInt(n)).toLocaleString().replace(/:\d{1,2}$/, " ");
    },
    async md2html() {
      this.content = await Vditor.md2html(`${this.result.content}`);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Josefin+Sans:400,400i,600,600i");
html,
body {
  margin: 0;
  height: 120%;
  font-family: "Josefin Sans", sans-serif;
}
a {
  text-decoration: none;
}
.header {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  height: 50vw;
  min-height: 400px;
  max-height: 550px;
  min-width: 300px;
  color: #eee;
}
.header:after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.12) 40%,
    rgba(27, 32, 48, 1) 100%
  );
}
.header:before {
  content: "";
  width: 100%;
  height: 200%;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-backface-visibility: hidden;
  -webkit-transform: translateZ(0);
  backface-visibility: hidden;
  /* scale(1.0, 1.0); */
  transform: translateZ(0);
  background: #1b2030
    url(https://images.unsplash.com/photo-1571993142257-eae0b44cf0f1?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ)
    50% 0 no-repeat;
  background-size: 100%;
  background-attachment: fixed;
  animation: grow 360s linear 10ms infinite;
  transition: all 0.4s ease-in-out;
  z-index: -2;
}
.header a {
  color: #eee;
}
.menu {
  display: block;
  width: 40px;
  height: 30px;
  border: 2px solid #fff;
  border-radius: 3px;
  position: absolute;
  right: 20px;
  top: 20px;
  text-decoration: none;
}
.menu:after {
  content: "";
  display: block;
  width: 20px;
  height: 3px;
  background: #fff;
  position: absolute;
  margin: 0 auto;
  top: 5px;
  left: 0;
  right: 0;
  box-shadow: 0 8px, 0 16px;
}
.logo {
  border: 2px solid #fff;
  border-radius: 3px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  align-content: center;
  margin: 20px;
  padding: 0px 10px;
  font-weight: 900;
  font-size: 1.1em;
  line-height: 1;
  box-sizing: border-box;
  height: 40px;
}
.sides,
.info {
  flex: 0 0 auto;
  width: 50%;
}
.info {
  width: 100%;
  padding: 15% 10% 0 10%;
  text-align: center;
  text-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
}
.author {
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: url(https://avatars.githubusercontent.com/u/57691895?v=4) center
    no-repeat;
  background-size: cover;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
  margin-bottom: 3px;
}
.info h4,
.meta {
  font-size: 0.7em;
}
.meta {
  font-style: italic;
}
@keyframes grow {
  0% {
    transform: scale(1) translateY(0px);
  }
  50% {
    transform: scale(1.2) translateY(-400px);
  }
}
.content {
  padding: 5% 10%;
  text-align: justify;
}
.btn {
  color: #333;
  border: 2px solid;
  border-radius: 3px;
  text-decoration: none;
  display: inline-block;
  padding: 5px 10px;
  font-weight: 600;
}

.twtr {
  margin-top: 100px;
}
.btn.twtr:after {
  content: "\1F638";
  padding-left: 5px;
  /* background-image: url(https://github.com/fluidicon.png); */
}
</style>
