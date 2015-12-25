var utils = {};

/**
 * The keys' name of cookies
 * 
 * @const
 * @type object
 */
utils.COOKIE_KEY = {
    SKIN: 'skin'
};

/**
 * 设置皮肤 Set the skin (By setting the className of the body element)
 */
utils.loadSkin = function () {
    // get the body element, and it was used to be the skin wrapper
    var skinWrapper = document.body;
    
    // if the wrapper exist, attempt to set selected skin
    if (skinWrapper) {
        // 默认皮肤
        skinWrapper.className = 'default';

        // 获得皮肤的cookie
        var skinCookies = utils.getCookies(utils.COOKIE_KEY.SKIN);
        if (skinCookies && skinCookies.length) {
            // 如果有一个或多个，则使用第一个
            skinWrapper.className = skinCookies[0];
        }
    } 
};

/**
 * Set the skin into cookie
 * 可供界面元素调用，设定皮肤
 * 
 * @param {string} skin, The skin class name
 */
utils.setSkin = function (skin) {
    utils.setCookie(utils.COOKIE_KEY.SKIN, skin);
    utils.loadSkin(); // change the skin of current page
};

/**
 * Add a cookie key-value pair.
 * 在path=/下添加cookie
 * 
 * @param {string} key
 * @param {string||object||number|...} val
 */
utils.setCookie = function (key, val) {
    document.cookie = key + "=" + val + ";path=/";
};

/**
 * 拿到cookie中某个key对应的所有value
 * 
 * @param {string} name cookie的key
 * @returns {Array<string>} 一系列cookie
 */
utils.getCookies = function (name) {
  var values = [];
  if(!document.cookie == ''){ 
    //用spilt('; ')切割所有cookie保存在数组arrCookie中 
    var arrCookie = document.cookie.split('; '); 
    var arrLength = arrCookie.length; 
    var keyValue;
    for(var i=0; i<arrLength; ++i) {
      keyValue = arrCookie[i].split('=');
      if (unescape(keyValue[0]) == name) {
          values.push(unescape(keyValue[1]));
      }
    } 
  }
  return values; 
};