import { ROOT_PATH } from 'GLOBAL'
const RMU = `/${ROOT_PATH}/`

export default {
  // 登录
  CHECKCODE_URL: `${RMU}IM01003.do`,
  LOGIN_URL: `${RMU}userLogin.do`,
  REGISTER_URL: `${RMU}userRegister.do`,
  SESSION_URL: `${RMU}IM01005.do`,

  // 注销 & 修改密码
  LOGOUT_URL: `${RMU}userLogout.do`,
  CHANGE_PASSWORD_URL: `${RMU}resetPwd.do`,

  // 机构
  GET_BRANCH_URL_BYID: `${RMU}IM02005.do`,
  GET_BRANCH_LIST_URL: `${RMU}IM02004.do`,
  GET_BRANCH_DELETE: `${RMU}IM02002.do`,
  GET_BRANCH_ADD: `${RMU}IM02001.do`,
  GET_BRANCH_MODIFY: `${RMU}IM02003.do`,

  // 岗位
  GET_POST_LIST_URL: `${RMU}IM02006.do`,
  GET_POST_ALL_LIST_URL: `${RMU}IM02009.do`,
  GET_QUERY_POST_LIST_URL: `${RMU}IM02010.do`,
  MODIFY_QUERY_POST_LIST_URL: `${RMU}IM02007.do`,
  DELTE_POST_LIST_URL: `${RMU}IM02008.do`,

  AUTHRESOURCE_URL: `${RMU}IM01006.do`,
  USERINFO_URL: `${RMU}IM01006.do`,

  GET_FUNCTIONlIST_URL: `${RMU}IM06004.do`,
  ADD_FUNCTIONITEM_URL: `${RMU}IM06001.do`,
  DEL_FUNCTIONITEM_URL: `${RMU}IM06003.do`,
  MOD_FUNCTIONITEM_URL: `${RMU}IM06002.do`,
  GET_FUNCTIONITEM_URL: `${RMU}IM06005.do`,

  USER_PAGE_BY_BRH_URL: `${RMU}IM03004.do`,

  GET_CONFIG_DATA_URL: `${RMU}IM01002.do`,
  GET_ROLE_LIST_URL: `${RMU}IM05003.do`,

  USER_ADD_URL: `${RMU}IM09004.do`,
  USER_BIND_ROLE_URL: `${RMU}IM03005.do`,
  USER_DEL_URL: `${RMU}IM03001.do`,

  USER_UPDATE_URL: `${RMU}IM03002.do`,
  USER_DEL_ROLE_URL: `${RMU}UserReverseRoleAction.do`,

  GET_ROLE_BY_USER_URL: `${RMU}IM03003.do`,
  GET_ROLE_BY_NAME_URL: `${RMU}RoleGetByNameAction.do`,

  // 角色详情
  GET_ITEM_BY_ROLE_URL: `${RMU}IM05004.do`,

  ROLE_UPDATE_URL: `${RMU}IM05002.do`,
  ROLE_NAME_CHK_URL: `${RMU}IM05004.do`,
  ROLE_ADD_URL: `${RMU}IM09005.do`,
  ROLE_DEL_URL: `${RMU}IM05001.do`,

  GET_ALL_ITEM_PAGE_URL: `${RMU}IM05005.do`,

  ROLE_BIND_ITEM_URL: `${RMU}IM05006.do`,

  GET_MENU_LIST_URL: `${RMU}IM07005.do`,
  MENU_ITEM_DEL_URL: `${RMU}IM07008.do`,
  GET_ITEM_BY_MENU_URL: `${RMU}IM07009.do`,
  GET_MENU_URL: `${RMU}IM07004.do`,

  GET_ABS_ITEM_PAGE_URL: `${RMU}IM07010.do`,

  ADD_MENU_ITEM_URL: `${RMU}IM07006.do`,
  UPDATE_MENU_URL: `${RMU}IM07002.do`,
  UPDATE_MENU_ITEM_URL: `${RMU}IM07007.do`,

  GET_ALL_FIRST_PAGE_URL: `${RMU}IM05007.do`,
  CONNET_USER_AND_ROLE_URL: `${RMU}IM09006.do`,

  // 策略管理
  GET_STRATEGY_LIST_URL: `${RMU}IM04005.do`,
  ADD_STRATEGY_URL: `${RMU}IM04001.do`,
  DELETE_STRATEGY_URL: `${RMU}IM04003.do`,
  EDIT_STRATEGY_URL: `${RMU}IM04002.do`,
  GET_STRATEGY_URL: `${RMU}IM04004.do`,
  GET_BSN_LIST_URL: `${RMU}IM08005.do`,
  SET_CONNECTION_URL: `${RMU}IM08007.do`,

  // 审查管理
  GET_CHECK_LIST_URL: `${RMU}IM09002.do`,
  GET_CHECK_HISTORY_LIST_URL: `${RMU}IM09001.do`,
  OPERATE_CHECK_URL: `${RMU}IM09003.do`,
  GET_STATE_LIST_URL: `${RMU}IM09007.do`,

  // TASKMAN
  GET_SCHEDULE_LIST: `${RMU}TSM01001.do`,
  OPERATE_SCHEDULE: `${RMU}TSM01018.do`,
  ADD_SCHEDULE: `${RMU}TSM01002.do`,
  SAVE_SCHEDULE: `${RMU}TSM01003.do`,
  DEL_SCHEDULE: `${RMU}TSM01004.do`,
  SCHEDULE_REL_TASK: `${RMU}TSM01014.do`,
  SAVE_SCHEDULE_TASK_REL: `${RMU}TSM01013.do`,

  // TASKMAN普通任务
  GET_TASK_LIST_URL: `${RMU}TSM01008.do`,
  ADD_TASK_LIST_URL: `${RMU}TSM01005.do`,
  MODIFY_TASK_LIST_URL: `${RMU}TSM01006.do`,
  DELETE_TASK_LIST_URL: `${RMU}TSM01007.do`,

  // TASKMAN批量任务
  GET_BATCH_TASK_LIST_URL: `${RMU}TSM01012.do`,
  ADD_BATCH_TASK_LIST_URL: `${RMU}TSM01009.do`,
  DETAIL_BATCH_TASK_LIST_URL: `${RMU}TSM01016.do`,
  MODIFY_BATCH_TASK_LIST_URL: `${RMU}TSM01011.do`,
  DELETE_BATCH_TASK_LIST_URL: `${RMU}TSM01010.do`,

  // 计划权限管理
  GET_ASSOCIATE_LIST_URL: `${RMU}TSM01017.do`,
  DO_SCHEDULE_ROLE_ASSOCIATE_URL: `${RMU}TSM01015.do`,

  // 今日实时
  TODAY_DETAILS_URL: `${RMU}TJ10007.do`,

  //时段分析
  TIME_ANALYSIS_URL: `${RMU}TJ10004.do`,

  //应用趋势
  APPLICATION_TREND_URL: `${RMU}TJ10003.do`,

  //版本分布
  VERSION_URL: `${RMU}TJ10008.do`,

  //地域分析
  REGION_URL: `${RMU}TJ10005.do`,

  //品牌分析
  BRAND:`${RMU}brandAnalyse.do`,
  BRNAD_TABLE:`${RMU}brandTableAnalyse.do`,

  //网络与运营商
  NET_AND_OPERATOR_URL: `${RMU}netAndCarrierAnalyse.do`,

  //分辨率
  RESOLUTION_URL: `${RMU}resolutionAnalyse.do`,
  //操作系统版本
  OSVERSION_TABLE_URL: `${RMU}osVerAnalyse.do`,
  OSVERSION_CHART_URL: `${RMU}osAnalyse.do`,

  // 实时Crash
  REAL_CRASH_DYNAMIC_URL: `${RMU}crashDynamic.do`,
  REAL_CRASH_CHART_URL: `${RMU}rtCrashCharts.do`,

  // Crash趋势
  CRASH_TREND_URL: `${RMU}crashTrendCharts.do`,
  CRASH_TRENDTABLE_URL: `${RMU}crashTableCharts.do`,

  //机型分析
  MODEL_TABLE_URL: `${RMU}moduleTableAnalyse.do`,
  MODEL_CHART_URL: `${RMU}moduleAnalyse.do`,

  //App管理
  //App查询
  APP_SELECT_URL: `${RMU}TJ10012.do`,
  //App新增
  APP_CREATE_URL: `${RMU}TJ10011.do`,
  //App删除
  APP_DELETE_URL: `${RMU}TJ10013.do`,
  //App更新
  APP_UPDATE_URL: `${RMU}TJ10014.do`,
  //downloadSDK
  DOWNLOAD_SDK_URL: `${RMU}TJ10020.do`,

  //自定义事件
  EVENT_URL:`${RMU}TJ10009.do`,
  EVENTDETAILS_URL:`${RMU}TJ10010.do`,

  //渠道效果
  CHANNEL_TABLE_URL: `${RMU}channelTableAnalyse.do`,
  CHANNEL_CHART_URL: `${RMU}channelAnalyse.do`,
  CHANNEL_STYLE_URL: `${RMU}channelListQuery.do`,

  EVENTDETAILS_URL:`${RMU}TJ10010.do`,
  //自定义事件查询
  EVENTMANAGE_URL:`${RMU}TJ10019.do`,
  //自定义事件更新,新增
  EVENTUPDATE_URL:`${RMU}TJ10017.do`,
  //自定义事件删除
  EVENTDELETE_URL:`${RMU}TJ10018.do`,

  //获取版本列表
  GETVERSION_URL:`${RMU}TJ10006.do`,

  //渠道管理
  //新增渠道
  CHANNEL_CREATE_URL:`${RMU}channelAdd.do`,
  //修改渠道
  CHANNEL_UPDATE_URL:`${RMU}channelUpdate.do`,
  //删除渠道
  CHANNEL_DELETE_URL:`${RMU}channelDel.do`,
  //查询渠道
  CHANNEL_SELECT_URL:`${RMU}channelInfo.do`,

  //用户活跃度
  USER_ACTIVE_URL: `${RMU}TJ10021.do`,

  //用户留存
  USER_RETAIN_URL: `${RMU}TJ10022.do`,

  //在线参数
  //新增在线参数
  ONLINE_PARAM_CREATE_URL:`${RMU}addCollectConf.do`,
  //修改在线参数
  ONLINE_PARAM_UPDATE_URL:`${RMU}updateCollectConf.do`,
  //查询在线参数
  ONLINE_PARAM_SELECT_URL:`${RMU}queryCollectConf.do`,

  //无码埋点
  //新增无码埋点
  BURIED_CREATE_URL:`${RMU}addBuriedConf.do`,
  //修改无码埋点
  BURIED_UPDATE_URL:`${RMU}updateBuriedConf.do`,
  //查询无码埋点
  BURIED_SELECT_URL:`${RMU}queryBuriedConf.do`,
  //删除无码埋点
  BURIED_DELETE_URL:`${RMU}deleteBuriedConf.do`
}
