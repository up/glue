/*jslint browser:true */

(function(glue) {
  'use strict';

  function getExpireDate(days) {
    var now, daysLater;
    if (!glue.isNumeric(days)) {
      return '';
    } else {
      daysLater = parseInt(days, 10) * 24 * 60 * 60 * 1000;
      now = new Date();
      now.setTime(now.getTime() + daysLater);
      return now.toGMTString();
    }
  }

  function encode(str) {
    try {
      str = encodeURIComponent(str);
    } catch (err) {}
    return str;
  }

  function decode(str) {
    try {
      str = decodeURIComponent(str);
    } catch (err) {}
    return str;
  }

  function cookiesToObject() {
    var cookies = {};
    glue.each(document.cookie.split(';'), function(index, cookie) {
      var parts = cookie.split('=');
      cookies[parts[0]] = parts[1];
    });
    return cookies;
  }

  function getCookie(key) {
    var results = [],
        i = 0,
        matches, cookies = document.cookie.split(";"),
        re = new RegExp("^\\s*" + key + "=\\s*(.*?)\\s*$");
    for (; i < cookies.length; i++) {
      try {
        results.push(cookies[i].match(re)[1]);
      } catch (err) {}
    }
    return decode(results[0]) || '';
  }

  function setCookie(key, value, options) {
    options = options || {};
    document.cookie = [
        encode(key), '=', value,
        options.expires ? '; expires=' + getExpireDate(options.expires) : '',
        options.path ? '; path=' + options.path : '',
        options.domain ? '; domain=' + options.domain : '',
        options.secure ? '; secure' : ''
      ].join('');
    return document.cookie;
  }

  function cookie(key, value, options) {
    if (key !== undefined) {
      if (value === undefined && options === undefined) {
        return getCookie(arguments[0]);
      } else {
        setCookie(key, value, options);
      }
    } else {
      return cookiesToObject();
    }
  }

  function removeCookie(key, options) {
    if (!glue.cookie(key)) {
      return false;
    } else {
      glue.cookie(key, '', glue.extend(options || {}, {
        expires: -1
      }));
      return !glue.cookie(key);
    }
  }

  /**
   * Set a cookie or get a cookie's value
   */
  glue.cookie = function(key, value, options) {
    return cookie(key, value, options);
  };

  /** 
   * Remove a cookie
   */
  glue.removeCookie = function(key, options) {
    return removeCookie(key, options);
  };

}(glue));
