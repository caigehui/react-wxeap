// import { submit, query } from '../services/index';
// import { delay } from 'react-wxeap';

export default {

	namespace: 'comRichContentView',

	state: {
		content: '<div class="news_part">何为理想的城市？<br><div class="contheight"></div>7月22日，“文景艺文季”系列沙龙邀请了建筑评论家史建、上海交通大学特聘教授陆铭、艺术评论家和建筑设计师唐克扬以及城市规划师茅明睿一起探讨了理想中的城市。<br><div class="contheight"></div><div style="text-align:center;"><img src="http://image.thepaper.cn/wap/image/5/953/488.jpeg" width="600" height="399" alt=""></div><span style="color: rgb(128, 128, 128);">讲座现场。</span><font color="#808080">左起：茅明睿、陆铭、史建、唐克扬</font><br><div class="contheight"></div><strong>史建：深圳的“落脚模式”和珠海的“宜居模式”</strong><br><div class="contheight"></div>史建认为，中国有两种典型的城市模式，一种深圳的“落脚模式”，另一种是珠海的“宜居模式”。<br><div class="contheight"></div>深圳和珠海在改革开放之初，起点相同，但后来却走了完全不一样的道路。”<br><div class="contheight"></div>“大家认为珠海不温不火，其实它在积聚力量。珠海从总体规划到区域规划全部都聘请国外顶级的规划师，站在国际最前沿的位置，不只用经济指标去衡量城市，对宜居也非常看重。”史建说。<br><div class="contheight"></div><div style="text-align:center;"><img src="http://image.thepaper.cn/wap/image/5/953/515.jpg" width="600" height="399" alt=""></div><span style="color: rgb(128, 128, 128);">上海轨道交通</span><br><div class="contheight"></div><strong>唐克扬：当城市是白色的时候</strong><br><div class="contheight"></div>作为一名建筑师，唐克扬认为他理想中的城市是“白色”的，“白色城市”的典故来源于1893年的芝加哥博览会：“对于欧洲人来说，美国是一个处女地，他们认为处女地的颜色，跟希腊颜色相近，而希腊的神庙似乎都是白色的。”<br><div class="contheight"></div><div style="text-align:center;"><img src="http://image.thepaper.cn/wap/image/5/953/503.jpg" width="400" height="581" alt=""></div><span style="color: rgb(128, 128, 128);">《当大教堂是白色的时候》</span><br><div class="contheight"></div>现代主义建筑师柯布西耶曾经写过一本《当大教堂是白色的时候》，说的是他去美国的一次旅游，参观完之后他发现大教堂是白色的。柯布西耶在书末写道：“为什么教堂是白色的，因为它们是新的。”唐克扬解释道：“这句话乍看之下摸不着头脑，他的意思是说，因为一切美好的事物在开始的时候都是新的、富有希望的，所以表现出来的颜色是白色。白色是因为新，这样的城市呈现出一片人为的、有计划的秩序。美和效率联系在一起，因为有效率所以美，因为美所以体现了效率。”<br><div class="contheight"></div><strong>茅明睿：</strong><strong>中国最理想街区是上海静安区</strong><strong><br><div class="contheight"></div></strong><br><div class="contheight"></div></div>'
	},
	subscriptions: {
		setup({ history }) {
			return history.listen(() => {
				// if (pathname === '/') {}
			});
		},
	},

	effects: {
	},

	reducers: {
		save(state, action) {
			return { ...state, ...action.payload };
		},
	},

	// 是否自动恢复state
	// persist: true
};
