import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'

const responseCode = {
  // common exception
  1: '',
  2: '',
  3: '',
  4: '',
  5: '',
  6: '',
  7: '',
  // config or data relative exception
  101: '',
  102: '',
  103: '',
  104: '',
  105: '',
  // web or portal relative exception
  201: '',
  202: '',
  203: '',
  204: '',
  205: '',
  206: '登陆失效'
}

const STATUS_OK = 200

const TIMEOUT = 60000

const statusCodeMsg = [
  {
    code: 401,
    msg: '未授权'
  },
  {
    code: 403,
    msg: 'forbidden'
  }
]
//权限管理系统
const baseURL = {
  dev: '/dii/',
  //部署到同一机器不要前缀
  prod: '/dii/'
};
//权限管理系统
const portalBaseURL = {
  dev: '/dii/cas-service/',
  //部署到同一机器不要前缀
  prod: '/dii/cas-service/'
}
//任务调度系统
const taskScheduleBaseURL = {
  dev: '/dii/schedule/',
  //部署到同一机器不要前缀
  prod: '/dii/schedule/'
}
//数据汇聚系统
const dataAggregationBaseUrl = {
  dev: '/dii/data-exchange/',
  prod: '/dii/data-exchange/'
}
//数据源管理系统
const datasourceManageBaseUrl = {
  dev: '/dii/data-source/',
  prod: '/dii/data-source/'
}
// 血缘信息
const metaLineageBaseUrl = {
  dev: '/dii/meta-lineage/',
  prod: '/dii/meta-lineage/'
}
//门户内容管理
const webPortalManageBaseUrl = {
  dev: '/dii/cms-web/',
  prod: '/dii/cms-web/'
}
//目录系统
const dataCatalogBaseUrl = {
  dev: '/dii/catalog/',
  prod: '/dii/catalog/'
}
//服务网关
const serviceGatewayBaseUrl = {
  dev: '/dii/gateway/',
  prod: '/dii/gateway/'
}
//数据接口服务
const dataServiceUrl = {
  dev: '/dii/dataway/interface-ui/',
  prod: '/dii/dataway/interface-ui/'
}
//数据接口服务-新
const dataServiceUrlNew = {
  dev: '/dii/dataway/interface-manage/',
  prod: '/dii/dataway/interface-manage/'
}
//数据稽核
const dataCheckBaseUrl = {
  dev: '/dii/quality/',
  prod: '/dii/quality/'
}
//数据处理
const dataConvertBaseUrl = {
  dev: '/dii/convert/',
  prod: '/dii/convert/'
}
//日志中心
const logCenterBaseUrl = {
  dev: '/dii/log-monster/',
  prod: '/dii/log-monster/'
}
//运维一体化
const devOpsBaseUrl = {
  dev: '/dii/dev-ops/api/',
  prod: '/dii/dev-ops/api/'
}

// 元数据预警
const metaWarn = {
  dev: '/dii/meta-warn/',
  prod: '/dii/meta-warn/'
};
// 流处理
const dataStream = {
  dev: '/dii/data-stream/',
  prod: '/dii/data-stream/'
};
//数据可视化
const visualizationBaseUrl = {
  dev: '/dii/visualization/',
  prod: '/dii/dataintelli/'
};
//数据挖掘
const dataMiningBaseUrl = {
  dev: '/dii/mining/',
  prod: '/dii/mining/'
}
//sso系统
const casSsoBaseUrl = {
  dev: '/dii/cas-sso/',
  //部署到同一机器不要前缀
  prod: '/dii/cas-sso/'
};

//数据集成
const integrationUrl = {
  dev: '/dii/integration/',
  prod: '/dii/integration/'
};
//数据集成
const excelUrl = {
  dev: '/dii/luckysheet/',
  prod: '/dii/luckysheet/'
};
Vue.prototype.$portalBaseURL = process.env.NODE_ENV === "production" ? portalBaseURL.prod : portalBaseURL.dev;
Vue.prototype.$dataCatalogBaseURL = process.env.NODE_ENV === "production" ? dataCatalogBaseUrl.prod : dataCatalogBaseUrl.dev;
// Vue.prototype.$dataCatalogBaseURL2 = process.env.NODE_ENV === "production" ? dataCatalogBaseUrl2.prod : dataCatalogBaseUrl2.dev;
Vue.prototype.$webPortalManageBaseUrl = process.env.NODE_ENV === "production" ? webPortalManageBaseUrl.prod : webPortalManageBaseUrl.dev;
Vue.prototype.$dataCheckBaseUrl = process.env.NODE_ENV === "production" ? dataCheckBaseUrl.prod : dataCheckBaseUrl.dev;
Vue.prototype.$dataStreamBaseUrl = process.env.NODE_ENV === "production" ? dataStream.prod : dataStream.dev;
Vue.prototype.$dataSourceUrl = process.env.NODE_ENV === "production" ? datasourceManageBaseUrl.prod : datasourceManageBaseUrl.dev;
Vue.prototype.$casSsoBaseUrl = process.env.NODE_ENV === "production" ? casSsoBaseUrl.prod : casSsoBaseUrl.dev;
Vue.prototype.$dataMiningBaseUrl = process.env.NODE_ENV === "production" ? dataMiningBaseUrl.prod : dataMiningBaseUrl.dev;
Vue.prototype.$metaLineageUrl = process.env.NODE_ENV === 'production' ? metaLineageBaseUrl.prod : metaLineageBaseUrl.dev
export {
  responseCode,
  STATUS_OK,
  TIMEOUT,
  statusCodeMsg,
  portalBaseURL,
  taskScheduleBaseURL,
  dataAggregationBaseUrl,
  datasourceManageBaseUrl,
  metaLineageBaseUrl,
  webPortalManageBaseUrl,
  dataCatalogBaseUrl,
  serviceGatewayBaseUrl,
  dataServiceUrl,
  dataServiceUrlNew,
  dataCheckBaseUrl,
  dataConvertBaseUrl,
  logCenterBaseUrl,
  metaWarn,
  dataStream,
  devOpsBaseUrl,
  integrationUrl,
  visualizationBaseUrl,
  dataMiningBaseUrl,
  casSsoBaseUrl,
  baseURL,
  excelUrl
}
