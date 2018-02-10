import Vue from "vue";
import Vuex from "vuex";

//导入LocalStorage的封装器，详细使用方式参考 Git上storejs
import LS from "storejs";

Vue.use(Vuex);

//定义数据仓库前缀，避免保存到LocalStorage中的数据节点冲突
var sysKeys = "DB_CCTV_Animation_";

/**
 * 定义每页显示记录条数的下拉菜单选项
 * @type {Array}
 */
const pageSizes = [10, 15, 20, 25, 50, 100];


/**
 * pageSize：定义每页默认显示记录条数
 * @type {int}
 */
const pageSize = 8;



/**
 * pageSize：定义默认导航路径
 * @type {int}
 */
const navmenu = "";

/**
 * [cpround_options 产品统计饼图状态]
 * @type {Array}
 */
const cpround_options = [{
	id: 30,
	title: "一个月"
}, {
	id: 90,
	title: "三个月"
}, {
	id: 180,
	title: "半年"
}, {
	id: 365,
	title: "一年"
}, {
	id: "",
	title: "所有"
}];

/**
 * [ticai_data 动画片题材]
 * @type {Array}
 * @author leo
 */
const ticai_data = ["现实", "历史", "教育", "科幻", "童话", "神话", "特殊", "其它"];


/**
 * [tags_data 动画片标签]
 * @type {Array}
 * @author leo
 */
const tags_data = ["电视剧", "电影", "获奖", "重点IP"];


/**
 * 动画片制作方式
 * @type {Array}
 * @author leo
 */
const make_type_data = [{
	id: 1,
	title: "2D"
}, {
	id: 2,
	title: "3D"
}, {
	id: 3,
	title: "其他"
}];

/**
 * 动画片状态类型
 * @type {Array}
 * @author leo
 */
const status_type_data = [{
	id: "1",
	title: "正常"
}, {
	id: "2",
	title: "下架"
}];



/**
 * 角色等级
 * @type {Array}
 * @author leo
 */
const juese_level_data = [{
	id: "1",
	title: "一级"
}, {
	id: "2",
	title: "二级"
}, {
	id: "3",
	title: "三级"
}, {
	id: "4",
	title: "四级"
}, {
	id: "5",
	title: "五级"
}];

/**
 * 合作伙伴类型
 * @type {Array}
 * @author leo
 */
const huoban_type_data = [{
	id: "1",
	title: "合作授权商"
}, {
	id: "2",
	title: "合作制造商"
}, {
	id: "3",
	title: "商业合作伙伴"
}];


/**
 * 授权品类，此数据仅作为参考数据，实际开发时将数据加到字典表中，同时“value”的值保存为正常的数字格式，不要按照现在的这种格式
 * @type {Array}
 * @author leo
 */
const shouquan_type_data = [{
	value: "1",
	label: "内容授权",
	children: [{
		value: "1-1",
		label: "电影"
	}, {
		value: "1-2",
		label: "舞台剧"
	}, {
		value: "1-3",
		label: "图书出版"
	}, {
		value: "1-4",
		label: "音像制品"
	}, {
		value: "1-5",
		label: "电视发行"
	}, {
		value: "1-6",
		label: "新媒体发行"
	}, {
		value: "1-7",
		label: "其他"
	}]
}, {
	value: "2",
	label: "商品授权",
	children: [{
		value: "2-1",
		label: "玩具"
	}, {
		value: "2-2",
		label: "文具"
	}, {
		value: "2-3",
		label: "礼品"
	}, {
		value: "2-4",
		label: "服装服饰"
	}, {
		value: "2-5",
		label: "食品"
	}, {
		value: "2-6",
		label: "日用品"
	}, {
		value: "2-7",
		label: "体育用品"
	}, {
		value: "2-8",
		label: "网络产品"
	}]
}, {
	value: "3",
	label: "促销授权",
	children: [{
		value: "3-1",
		label: "商超促销"
	}, {
		value: "3-2",
		label: "电商促销"
	}, {
		value: "3-3",
		label: "连锁餐饮促销"
	}, {
		value: "3-4",
		label: "美陈促销 "
	}]
}, {
	value: "4",
	label: "主题授权",
	children: [{
		value: "4-1",
		label: "娱乐"
	}, {
		value: "4-2",
		label: "体验馆"
	}, {
		value: "4-3",
		label: "餐饮"
	}, {
		value: "4-4",
		label: "公园"
	}, {
		value: "4-5",
		label: "频道"
	}, {
		value: "4-6",
		label: "教育"
	}, {
		value: "4-7",
		label: "公益"
	}]
}, {
	value: "5",
	label: "其他",
	children: [{
		value: "5-1",
		label: "其他"
	}]
}];

/**
 * 用户类型，此节点不需要更新
 * @type {Array}
 */
const member_type_data = [{
	id: "1",
	title: "普通用户"
}, {
	id: "2",
	title: "授权商"
}];

/**
 * 注册用户来源，此节点不需要更新
 * @type {Array}
 */
const member_source_data = [{
	id: "1",
	title: "授权官网"
}, {
	id: "2",
	title: "电商平台"
}];

/**
 * [dhid 动画片ID]
 * @type {[type]}
 * author sy 2017-10-27
 */
const dhid = null;

/**
 * 影片首播平台数据
 * @type {Array}
 */
const shoubo_plate_data = ["CCTV 儿童频道", "腾讯视频", "乐视视频"];

/**
 * [caiData 踩的文章]
 * @type {Array}
 * @author sy 2017-11-10
 */
const caiData = [];

/**
 * [dingData 顶的文章]
 * @type {Array}
 * @author sy 2017-11-10
 */
const dingData = [];

/**
 * 用户偏好设置
 * @type {Object}
 * layout 界面布局设置
 * slider 侧边栏设置
 * skin 界面皮肤设置
 * bgImg 登录页面背景图片
 */
const settings = {
	layout: {
		boxLayout: {
			status: false,
			bgimg: ""
		},
		animate: {
			status: true,
			type: "effect"
		},
		fixed: {
			header: false,
			footer: false,
			slider: false
		}
	},
	slider: {
		uinfo: true,
		fastlink: true,
		menu: false
	},
	skin: "static/css/themes/type-b/theme-dust.min.css",
	bgImg: ""
};

/**
 * [fullPath 添加或者设置编辑记录当前路由]
 * @type {String}
 * @author sy 2017-10-31
 */
const fullPath = "";

/**
 * [保存用户登录信息]
 * @type {Object}
 */
const uinfo = {};

/**
 * [user_url 个人中心 导航url]
 * @type {string}
 * @author zhy
 */
const user_url = "ucenter_home";


/**
 * [last_time 记录最后操作时间戳]
 * @type {String}
 */
const last_time = "";


/**
 * [tcChoose_data 检索的题材-动画 ]
 * @type {Array}
 * @author zhy 2017-11-9
 */
const tcChoose_data = [];

/**
 * [tcChoose_data 检索的标签-动画 ]
 * @type {Array}
 * @author zhy 2017-11-9
 */
const bqChoose_data = [];


/**
 * [tcChoose_data 检索的题材-角色 ]
 * @type {Array}
 * @author zhy 2017-11-9
 */
const js_tcChoose_data = [];

/**
 * [tcChoose_data 检索的标签-角色 ]
 * @type {Array}
 * @author zhy 2017-11-9
 */
const js_bqChoose_data = [];

/**
 * [tcbq_data 题材 标签]
 * @type {Array}
 * @author zhy 2017-11-9
 */


const tcbq_data = {
	tc_data: [{
		id: 2,
		name: "历史"
	}],
	bq_data: [{
		id: 1,
		name: "现实"
	}],
	last_time: ""
};

/**
 * [tcChoose_data 成功案例类别 ]
 * @type {Array}
 * @author zhy 2017-11-16
 */
const case_data = {
	data: [],
	last_time: ""
};


/**
 * [tcChoose_data 检索的成功案例类别 ]
 * @type {Array}
 * @author zhy 2017-11-16
 */
const case_choose = [];

/**
 * [shouquan_data 授权申请数据]
 * @type {Array}
 */
const shouquan_data = [];

/**
 * [notice_id 请求获取通知公告数据 全部id集合]
 * @type {Array}
 * [click_noticeid 通知公告已读 用户查看过的id集合]
 * @type {Array}
 */
const notice_id = [];

const click_noticeid = [];


/**
 * [options 授权状态]
 * @type {Array}
 */
const options = [{
	id: 1,
	title: "待确认"
}, {
	id: 2,
	title: "审核中"
}, {
	id: 4,
	title: "授权中"
}, {
	id: 3,
	title: "即将过期"
}, {
	id: 5,
	title: "已过期"
}, {
	id: 8,
	title: "无效申请"
}];

/**
 * [ht_options 授权状态]
 * @type {Array}
 */
const ht_options = [{
	id: 1,
	title: "待确认"
}, {
	id: 2,
	title: "审核中"
}, {
	id: 3,
	title: "通过审核"
}, {
	id: 4,
	title: "未通过审核"
}, {
	id: 5,
	title: "线下签约"
}, {
	id: 6,
	title: "已作废"
}, {
	id: 7,
	title: "正常"
}, {
	id: 8,
	title: "已过期"
}];


/**
 * [cp_options 授权状态]
 * @type {Array}
 */
const cp_options = [{
	id: 1,
	title: "审核中"
}, {
	id: 2,
	title: "未通过"
}, {
	id: 3,
	title: "进行中"
}, ];

/**
 * [Perfect_information 申请授权时用户完善信息的数据]
 * @type {Array}
 */
const Perfect_information = [];

/**
 * [API_Err_Info 接口请求失败后报错信息]
 * @type {Object}
 * @author leo
 */
const API_Err_Info = {
	title: "啊哦，出错咯！",
	message: "接口请求失败，赶紧联系工程师抢修吧~",
	duration: 0,
	offset: 5
};


const state = {
	settings: settings,
	pageSizes: pageSizes,
	pageSize: pageSize,
	API_Err_Info: API_Err_Info,
	navmenu: navmenu,
	user_url: user_url,
	uinfo: uinfo,
	tcbq_data: tcbq_data,
	shouquan_data: shouquan_data,
	tcChoose_data: tcChoose_data,
	bqChoose_data: bqChoose_data,
	js_tcChoose_data: js_tcChoose_data,
	js_bqChoose_data: js_bqChoose_data,
	case_data: case_data,
	case_choose: case_choose,
	last_time: last_time,
	ticai_data: ticai_data,
	make_type_data: make_type_data,
	tags_data: tags_data,
	juese_level_data: juese_level_data,
	huoban_type_data: huoban_type_data,
	shouquan_type_data: shouquan_type_data,
	member_type_data: member_type_data,
	member_source_data: member_source_data,
	status_type_data: status_type_data,
	shoubo_plate_data: shoubo_plate_data,
	dhid: dhid,
	fullPath: fullPath,
	dingData: dingData,
	caiData: caiData,
	notice_id: notice_id,
	click_noticeid: click_noticeid,
	options: options,
	ht_options: ht_options,
	cp_options: cp_options,
	Perfect_information: Perfect_information,
	cpround_options: cpround_options
};


/* 从本地存储读取数据 */
for (var item in state) {
	LS.get(sysKeys + item) ? state[item] = JSON.parse(LS.get(sysKeys + item)) : false;
}


//从组件中提交请求方法，写在此类下，注意保存时，一定要保存为json
const mutations = {

	setPageSize(state, payload) {
		state.pageSize = payload;
		LS.set(sysKeys + "pageSize", JSON.stringify(state.pageSize));
	},
	//设置界面是否为盒子布局
	setBoxLayout(state, data) {
		state.settings.layout.boxLayout.status = data;
		LS.set(sysKeys + "settings", JSON.stringify(state.settings));
	},
	//设置盒子背景图片
	setBoxBgimg(state, data) {
		state.settings.layout.boxLayout.bgimg = data;
		LS.set(sysKeys + "settings", JSON.stringify(state.settings));
	},
	//设置是否开启页面动画
	setAnimate(state, data) {
		state.settings.layout.animate = data;
		LS.set(sysKeys + "settings", JSON.stringify(state.settings));
	},
	//设置固定位置
	setFixed(state, payload) {
		state.settings.layout.fixed = payload;
		LS.set(sysKeys + "settings", JSON.stringify(state.settings));
	},
	//设置显示左侧信息
	setSlider(state, payload) {
		state.settings.slider = payload;
		LS.set(sysKeys + "settings", JSON.stringify(state.settings));
	},
	//记录最后操作时间
	setLast_time(state, payload) {
		state.last_time = payload;
		LS.set(sysKeys + "last_time", JSON.stringify(state.last_time));
	},
	//设置皮肤
	setTheme(state, payload) {
		state.settings.skin = payload;
		LS.set(sysKeys + "settings", JSON.stringify(state.settings));
	},
	//设置登录页面背景图片
	setBgImg(state, payload) {
		state.settings.bgImg = payload;
		LS.set(sysKeys + "settings", JSON.stringify(state.settings));
	},
	//存储用户信息
	setUinfo(state, payload) {
		state.uinfo = payload;
		LS.set(sysKeys + "uinfo", JSON.stringify(state.uinfo));
	},
	//存储导航路径
	setNavmenu(state, payload) {
		state.navmenu = payload;
		LS.set(sysKeys + "navmenu", JSON.stringify(state.navmenu));
	},
	//保存当前登录用户左侧的导航权限
	setUserUrl(state, payload) {
		state.user_url = payload;
		LS.set(sysKeys + "user_url", JSON.stringify(state.user_url));
	},
	//存储题材，标签
	setTcbq_data(state, payload) {
		state.tcbq_data = payload;
		LS.set(sysKeys + "tcbq_data", JSON.stringify(state.tcbq_data));
	},
	//存储检索的标签题材_动画
	setTc_Choose(state, payload) {
		state.tcChoose_data = payload;
		LS.set(sysKeys + "tcChoose_data", JSON.stringify(state.tcChoose_data));
	},
	//存储检索的标签——动画
	setBq_Choose(state, payload) {
		state.bqChoose_data = payload;
		LS.set(sysKeys + "bqChoose_data", JSON.stringify(state.bqChoose_data));
	},
	//存储检索的标签题材_角色
	setJsTc_Choose(state, payload) {
		state.js_tcChoose_data = payload;
		LS.set(sysKeys + "js_tcChoose_data", JSON.stringify(state.js_tcChoose_data));
	},
	//存储检索的标签——角色
	setJsBq_Choose(state, payload) {
		state.js_bqChoose_data = payload;
		LS.set(sysKeys + "js_bqChoose_data", JSON.stringify(state.js_bqChoose_data));
	},
	//存储成功案例类别
	seCcase_data(state, payload) {
		state.case_data = payload;
		LS.set(sysKeys + "case_data", JSON.stringify(state.case_data));
	},
	//存储检索的成功案例类别
	setCase_choose(state, payload) {
		state.case_choose = payload;
		LS.set(sysKeys + "case_choose", JSON.stringify(state.case_choose));
	},
	//存储授权信息
	setshouquan_data(state, payload) {
		state.shouquan_data = payload;
		LS.set(sysKeys + "shouquan_data", JSON.stringify(state.shouquan_data));
	},

	//保存ID
	setID(state, payload) {
		state.dhid = payload;
		LS.set(sysKeys + "dhid", JSON.stringify(state.dhid));
	},
	//保存列表路由
	setFullPath(state, payload) {
		state.fullPath = payload;
		LS.set(sysKeys + "fullPath", JSON.stringify(state.fullPath));
	},
	//设置踩数据
	setcaiData(state, payload) {
		state.caiData.push(payload);
		LS.set(sysKeys + "caiData", JSON.stringify(state.caiData));
	},
	//设置顶数据
	setdingData(state, payload) {
		state.dingData.push(payload);
		LS.set(sysKeys + "dingData", JSON.stringify(state.dingData));
	},
	//请求获取通知公告数据 全部id集合
	setnotice_id(state, payload) {
		state.notice_id = payload;
		LS.set(sysKeys + "notice_id", JSON.stringify(state.notice_id));
	},
	//通知公告已读 用户查看过的id集合
	setclick_noticeid(state, payload) {
		state.click_noticeid = payload;
		LS.set(sysKeys + "click_noticeid", JSON.stringify(state.click_noticeid));
	},
	//存储用户申请授权时完善信息的数据
	setPerfect_information(state, payload) {
		state.Perfect_information = payload;
		LS.set(sysKeys + "Perfect_information", JSON.stringify(state.Perfect_information));
	},
};


//数据过滤
const getters = {
	Request_Head: state => {
		return {
			"User-Token": state.uinfo.token || ""
		};
	}
};
export default new Vuex.Store({
	state,
	mutations,
	getters
});