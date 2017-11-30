#Icartoon2
###命名方式
1.文件编码格式都为UTF-8，mac 建的文件默认UTF-8，不需要变。

2.包名统一用小写，不使用驼峰命名法。

3.类名大写开头，使用驼峰命名法。属性小写开头，使用驼峰命名法。

4.所有activity都在其后加一个activity，所有fragment都在都在其后加fragment，所有adapter都在其后加adapter。

5.drawable中，shape使用shape开头，selector使用selector开头，svg使用svg开头。

6.png、jpg等图片都放到mipmap中，drawable中放的shape、selector、svg生成的png等。改新界面的图片都以new_开头。

7.layout中，activity都使用activity开头，fragment都使用fragment开头。适配器中的item，使用item加所在的界面名。自定义view使用view开头。


8.方法命名：

初始化相关方法，使用init为前缀标识，如：初始化布局initView()；

boolean型使用is或check为前缀标识, 如：checkValue()、isValidate();

返回某个值的方法，使用get为前缀标识，如：getName();

数据进行处理相关，尽量使用process为前缀标识，如：processUpdate();

保存数据相关，使用save为前缀标识，如：saveData();

对数据重置的，使用reset前缀标识，如：resetData();

清除数据相关，使用clear前缀标识，如：clearData();

移除某些项目，使用remove前缀标识，如:removeItem();

绘制数据或效果相关的，使用draw前缀标识，如：drawCircle();

9.非模型类的全局参数（成员变量）建议加上小写m开头

10.常量建议全部大写用下划线分割
比如：
    public static final String CATE_BOOK_PARAMS_KEY = "CATE_BOOK_PARAMS_KEY";


11.控件id命名：尽量以控件的缩写为前缀
比如：
    TextView----tv
    EditeText---et
    Button------btn

    RelativeLayout	rl
    LinearLayout	ll
    FrameLayout	    fl
    TextView	    tv
    Button	        btn
    ImageButton	    ibtn
    ImageView	    iv
    CheckBox	    cb
    RadioButton	    rb
    EditText	    edt
    ToggleButton	tbtn
    ProgressBar	pb
    VideoView	vv
    WebView	wv
    ScrollView	sv
    ListView	lv
    GridView	gv
    RecycleView	rv

12.工具类统一放在utils包中并以utils为后缀

13。dimen文件中命名：dimen为前缀，下划线分割，具体值为后缀方便使用（尽量不写死在布局中，统一到dimen文件中维护）

    比如：

    <dimen name="dimen_32">32px</dimen>
    <dimen name="dimen_30">30px</dimen>
    <dimen name="dimen_20">20px</dimen>

14.string文件中定义的字符串引用，根据模块的划分使用注释的方式进行一个区分（尽量不直接写字符串方式，sutdio会包警告，且可以统一到string中维护）

    比如：

    <!--发现-->
        <string name="bottom_found">发现</string>

    <!--书库-->
        <string name="bottom_book">书库</string>

15.关于lint检查（代码的整洁性），尽量消除代码中的黄色警告，且合理使用回车（一般分割一行代码，一次回车空一行即可，不用空太多行）
    比如ImageView：
        加入
            android:contentDescription="@null"  消除黄色警告

###包结构
1.现在的包结构：

- icartoon
   - base   基类
     - BaseActivity 所有activity均继承于此类
     - BaseFragment 所有fragment均继承于此类
     - RefreshActivity 封装的一个有下拉刷新自动加载更多的activity
     - RefreshFragment 封装的一个有下拉刷新自动加载更多的fragment
     - SwipeBackActivity 继承此类的activity拥有滑动回退效果
   - constant  常量及常用变量
     - Constants 常量及常用变量
   - helper  一些工具类
     - DateHelper 日期处理类
     - DBHelper 数据库处理类
     - FileHelper 文件工具类
     - PhoneHelper 常用方法类
     - TouchHelper 简单的点击效果
   - model 数据模型
     - db  数据库模型
       - AppDatabase 数据库配置
       - CollectionBean 收藏与历史
       - DownLoadBean 下载的漫画
       - DownLoadItemBean 下载的漫画章节信息
       - Migration 需要添加字段时使用
     - BookItemBean 书库子类别
   - net 网络及图片
     - CodeException 为了存一个图片请求的code
     - MyCacheKeyFactory 自定义的图片缓存键值规则
     - OkHttpImagePipelineConfigFactory 让fresco使用okhttp
     - OkHttpNetworkFetcher 让fresco使用okhttp
   - service
     - DownLoadService 下载图片及同步收藏历史等的服务
     - FrescoDownListener 下载回调接口
     - FrescoGuards 缓存下载的具体逻辑
     - HomeWatcherReceiver 暂时没用
     - NotificationProxyReceiver 推送代理点击
     - OnDownLoadProgressListener 下载进度回调接口
   - ui UI
     - adapter 适配器
       - BookAdapter 书库分类子项适配器
       - BookCateAdapter 书库分类别适配器
       - BookPagerAdapter 书库按类别分页适配器
       - ChangeSourceAdapter 换源适配器
       - CommentDetailAdapter 评论详情
       - CommentGroupAdapter 评论分组
       - CoverMainPagerAdapter 引导页
       - CoverPagerAdapter 引导图片页
       - DetailAdapter 详情页目录
       - DetailRecommedAdapter 详情页推荐
       - DownAdapter 下载章节
       - GridAdapter 推荐列表
       - GridImageAdapter 评论图片若有多张
       - MineCollectionAdapter 收藏与历史
       - MineDownLoadAdapter 下载漫画页
       - ReadScaleAdapter 阅读页连续模式
       - ReadViewPagerAdapter 阅读页单页模式
       - SearchHistoryAdapter 搜索页历史
       - TestNetAdapter 网络测试
       - VPAdapter fragment的adapter
     -book 书库
       - BookFragment 书库页面
       - BookInputActivity 搜索页面
       - BookSearchActivity 搜索结果页及分类结果页
     - feedback 反馈
       - FeedBackActivity 反馈页
     - listener
       - OnDownLoadListener 下载页进度状态等回调
     - mine 我的
       - DownLoadActivity 下载进度，由消息通知点击进入
       - LoginActivity 等三方登录
       - MineCollectionFragment 收藏页及历史纪录页
       - MineDownLoadFragment 下载漫画页
       - MineFragment 我的页面，包含收藏、历史、缓存等子页面
       - UserActivity 用户信息页
     - preview 图片预料
       - PreViewImageActivity 图片预料页
     - read 阅读
       - helper
       - ReadActivity 阅读页
       - ReadController 阅读页控制器
     - recommend 推荐及详情及评论
       - CommentActivity 评论页
       - CommentDetailActivity 评论详情页
       - CommentReplyActivity 评论回复页
       - DetailActivity 详情页
       - DownActivity 下载章节页
       - GridFragment 推荐子页面
       - RecommendFragment 推荐
     - set 设置
       - AboutActivity 关于
       - SetActivity 设置 可从阅读页点击进入
       - SetFragment 设置
       - TestNetActivity 网路设置
     - CoverActivity 启动页
     - GuideActivity 引导页
     - MainActivity 主页
     - OpenAdvActivity 开屏广告
     - RecoveryActivity 崩溃后提示页
     - TestActivity 测试一些小问题时使用
     - WebActivity webview加载页
   - utils 工具类
     - AppInit application初始化
     - FrescoUtils Fresco工具类
     - JsTools 从其它网页抓去解析图片时使用
     - LightnessController 亮度调节
     - NavigationBarUtils 虚拟按键
     - PreferenceUtil Preference存储
     - ShortcutUtils 快捷方式
     - Utils 主要使用的工具类
   - view 各种自定义控件
   - App application
   - AppCallBack activity的生命周期回调





###缩写

1.控件缩写

|  控件 |  缩写 | 例子 |
| :------------: | :------------: | :------------: |
|  LinearLayout | ll	  | ll_friend  |
|  RelativeLayout | rl  |  rl_friend |
|  FrameLayout   | fl  |  fl_friend |
|  TableLayout | tl  |  tl_friend |
|  Button | btn  |  btn_friend |
|  ImageButton | ib  |  ib_friend |
|  TextView | tv  |  tv_friend |
|  EditText | et  |  et_friend |
|  ListView | lv  |  lv_friend |
|  ImageView | iv  |  iv_friend |
|  RecyclerView | rv  |  rv_friend |
|  GridView | gv  |  gv_friend |


### 夜间模式

夜间模式的实现方式是使用主题和遍历实现的。切换模式时，遍历已存在的页面中每个view，并给它们设置颜色值。为打开的页面，打开时会设置主题，会使用主题中设置的颜色值。

写新的页面时，所有颜色值从R.attr中调用。

#### 屏幕适配
屏幕适配，我们使用的是AutoLayout方案。在xml中使用px，继承基类AutoLayoutActivity。

写新的页面时，大小尽量引用R.dimen中的大小。


### 第三方库
自己写的库：
 - canadapter 适配器，大部分都继承CanRVAdapter使用，少部分继承CanRVHFAdapter
 - canbus 发送消息 使用反射实现
 - canrefresh 下来刷新库
 - canrecyclerview recyclerview的一些封装
 - candialog 自定义额的dialog
 - canokhttp 对okhttp的简易封装。主要有缓存、https失败切换http等功能。
 - canshare 第三方登录分享。

其它库：
 - fresco 图片加载。
 - butterknife view注解。
 - cysdk 畅言评论的sdk，由于有一些bug，反编译修改后重新打包。
 - autolayout 屏幕适配。
 - canping ping IP或CDN。
 - relinker 加载so文件。
 - bolts-tasks fresco使用的线程库。
 - fastjson json解析。
 - klog 日志打印。
 - rhino 可直接运行js代码的库。
 - calligraphy 加载字体文件。
 - DBFlow 数据库。


### 第三方库使用注意及说明

#### autolayout
1.在xml中，使用px做自动适配。
2.在xml中，所有LinearLayout、FrameLayout、RelativeLayout其下的view都能自动适配，如果不需要自动适配，用NoAutoFrameLayout等。
3.在xml中做了自动适配的view，在java代码中，重新设置尺寸间距可能会无效。需在java中设置的，用NoAutoFrameLayout等。
4.item的最外层的宽高是适配不了的，要适配的话，可在其外再包一层FrameLayout。
5.drawable中的shape等都是适配不了的，都用dp。



### 遇到过的一些问题。
1.在xml中的TextView中使用maxLine=1，同时使用ellipsize=middle，在一些手机上会报错。解决方案，使用singleLine=true。




### 热更新
1.使用tinker
命令：打包正式版./gradlew assembleRelease
打包补丁./gradlew buildTinkerPatchRelease