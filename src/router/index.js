import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store.js'

/**======================= 开始引用相关页面组件 ==========================*/

//我的面板，默认主页
import Page404 from '@/page/404'
import AppLayout from '@/page/public/layout.vue'


import Home_index from '@/page/index.vue'
import Donghuapian_index from '@/page/donghuapian/index.vue'
import Donghuapian_detail from '@/page/donghuapian/detail.vue'
import Juesexingxiang_index from '@/page/juesexingxiang/index.vue'
import Juesexingxiang_detail from '@/page/juesexingxiang/detail.vue'
import Yansheng_cases from '@/page/donghuapian/cases.vue'
import News_index from '@/page/news/shouquanfabu.vue'
import Shouquanfabu from '@/page/news/new'
import Shouquanfabu_detail from '@/page/news/sqfb-details.vue'
import Newssearch from '@/page/news/sousuo_list'
import Chenggonganli_index from '@/page/cases/index.vue'
import Hezuohuoban_index from '@/page/hezuohuoban/index.vue'
import ContactUs_index from '@/page/other/contact.vue'
import Info_index from '@/page/other/info.vue'
import Shenqingshouquan from '@/page/donghuapian/shouquan.vue'
import Wanshanxinxi from '@/page/donghuapian/wanshanxinxi.vue'

//通知中心
import Message from '@/page/message/index.vue'
//通知详情
import Message_detail from '@/page/message/message_detail.vue'

// 用户中心模块 开始
import UCenterLayout from '@/page/usercenter/layout'
import UCenter_home from '@/page/usercenter/home'
import UCenter_my_shouquan from '@/page/usercenter/my_shouquan'
import UCenter_my_hetong from '@/page/usercenter/my_hetong'
import UCenter_shouquanchanpin from '@/page/usercenter/shouquanchanpin'
import UCenter_shouquanchanpin_detail from '@/page/usercenter/shouquanchanpin_detail'
import UCenter_batch_detail from '@/page/usercenter/batch_detail'
import ZhichiShenqing from '@/page/usercenter/zhichiShenqing'

// 用户中心模块 结束
Vue.use(Router)
    //30分钟内无操作则自动锁屏
let timeout = 60 * 30

//根据当前部署环境，读取当前项目部署路径
let AppPath = process.env.APP_PATH

const router = new Router({
    //设置全局路由点击之后添加的类名
    linkActiveClass: 'active-link',
    mode: 'history',
    //配置路由所在项目中的子目录，默认为“/”
    base: AppPath,
    routes: [{
            //当无法找到匹配的路由时，显示 404
            path: '*',
            meta: {
                pagename: '404 错误！'
            },
            component: Page404,
        }, {
            //设置网址根路径
            path: '/',
            component: AppLayout,
            children: [{
                //主界面布局路由
                path: '',
                name: "home",
                meta: {
                    pagename: '主页'
                },
                component: Home_index
            }, {
                path: 'donghuapian',
                name: "donghuapian",
                meta: {
                    pagename: '动画片名'
                },
                component: Donghuapian_index
            }, {
                path: 'donghuapian/:id',
                name: "case_donghuapian",
                meta: {
                    pagename: '动画片名',
                },
                component: Donghuapian_index
            }, {
                path: 'donghuapian/detail/:id',
                name: "dhp-detail",
                meta: {
                    pagename: '动画片'
                },
                component: Donghuapian_detail
            }, {
                path: 'juesexingxiang',
                name: "juesexingxiang",
                meta: {
                    pagename: '角色形象'
                },
                component: Juesexingxiang_index
            }, {
                path: 'juesexingxiang/detail/:id',
                name: "jsxx-detail",
                meta: {
                    pagename: '角色形象'
                },
                component: Juesexingxiang_detail
            }, {
                path: 'yansheng/cases/:id/:type',
                name: "yansheng-cases",
                meta: {
                    pagename: '衍生-成功案例'
                },
                component: Yansheng_cases
            }, {
                path: 'news',
                meta: {
                    pagename: '授权发布'
                },
                component: News_index,
                children: [{
                    name: 'news-article',
                    path: 'article',
                    meta: {
                        pagename: '最新文章',
                        type: 6
                    },
                    component: Shouquanfabu
                }, {
                    name: 'news-shouquanfabu',
                    path: 'shouquanfabu',
                    meta: {
                        pagename: '授权发布',
                        type: 1
                    },
                    component: Shouquanfabu
                }, {
                    name: 'news-redianzixun',
                    path: 'redianzixun',
                    meta: {
                        pagename: '热点资讯',
                        type: 2
                    },
                    component: Shouquanfabu
                }]
            }, {
                name: 'news-search',
                path: 'search/:keys',
                meta: {
                    pagename: '搜索详情',
                    type: 6
                },
                component: Newssearch
            }, {
                path: 'details-:id',
                name: "sqfb-details",
                component: Shouquanfabu_detail
            }, {
                path: 'cases',
                name: "chenggonganli",
                meta: {
                    pagename: '成功案例'
                },
                component: Chenggonganli_index
            }, {
                path: 'hezuohuoban',
                name: "hezuohuoban",
                meta: {
                    pagename: '合作伙伴'
                },
                component: Hezuohuoban_index
            }, {
                path: 'contact-us',
                name: "contact-us",
                meta: {
                    pagename: '联系我们'
                },
                component: ContactUs_index
            }, {
                path: 'info-:id',
                name: "about",
                meta: {
                    pagename: '相关信息'
                },
                component: Info_index
            }, {
                path: 'public_shouquan-:id',
                name: "shenqingshouquan",
                meta: {
                    pagename: '申请授权'
                },
                component: Shenqingshouquan
            }, {
                path: 'public-wanshanxinxi-:id',
                name: "wanshanxinxi",
                meta: {
                    pagename: '完善信息'
                },
                component: Wanshanxinxi
            }]
        },
        //用户中心开始
        {
            path: '/ucenter',
            meta: {
                pagename: '用户中心'
            },
            component: UCenterLayout,
            children: [{
                path: 'dashboard',
                name: 'ucenter_home',
                component: UCenter_home
            }, {
                path: 'myShouquan',
                name: 'myShouquan',
                component: UCenter_my_shouquan
            }, {
                path: 'myHetong',
                name: 'myHetong',
                component: UCenter_my_hetong
            }, {
                path: 'shouquanchanpin',
                name: 'sq_chanpin',
                component: UCenter_shouquanchanpin
            }, {
                path: 'shouquanchanpin/shouquanchanpin_detail/:pid/:id',
                name: 'shouquanchanpin_detail',
                component: UCenter_shouquanchanpin_detail
            }, {
                path: 'shouquanchanpin/batch_detail/:did/:id',
                name: 'batch_detail',
                component: UCenter_batch_detail
            }, {
                path: 'zhichishenqing',
                name: 'zhichishenqing',
                component: ZhichiShenqing
            }, {
                name: 'message',
                path: 'message',
                meta: {
                    pagename: '通知中心'
                },
                component: Message

            }, {
                name: 'message_detail',
                path: 'message_detail-:id',
                meta: {
                    pagename: '通知公告详情'
                },
                component: Message_detail
            }]
        }
        //用户中心结束
    ],
    //当开启history模式时，此项有效，实现返回上一个页面时默认将滚动条定位到原位置
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
})

//检测token是否存在，否则退回登录
router.beforeEach((to, from, next) => {
    const nextRoute = [
        'ucenter_home',
        'myShouquan',
        'myHetong',
        'message',
        'notice',
        'sq_chanpin',
        'letter',
        'add_notice',
        'shenqingshouquan',
        'wanshanxinxi'
    ];
    if (nextRoute.indexOf(to.name) >= 0) {
        //未登录
        if (!store.state.uinfo.account) {
            router.push({
                name: 'home'
            })
        }
    }
    next();
})
export default router