//~~tv:20010.20140827
//~~tc: Tealium Custom Container

/*
  Tealium Custom Container Notes:
  - Add sending code between "Start Tag Sending Code" and "End Tag Sending Code".
  - Add JavaScript tag library code between "Start Tag Library Code" and "End Tag Library Code".
  - Add JavaScript code only, do not add HTML code in this file.
  - Remove any <script> and </script> tags from the code you place in this file.

  Loading external JavaScript files (Loader):
  - If you need to load an additional external JavaScript file, un-comment the singe-line JavaScript comments ("//") within the following Loader sections near the bottom of this file:
      - "Start Loader Function Call"
      - "End Loader Function Call"
      - "Start Loader Callback Function"
      - "End Loader Callback Function"
  - After un-commenting, insert the path to the external JavaScript file you want to load.
  - Finally, within the Loader callback function, insert the JavaScript code that should run after the external JavaScript file has loaded.
*/

/* Start Tag Library Code */
/* End Tag Library Code */

//tealium universal tag - utag.sender.custom_container ut4.0.##UTVERSION##, Copyright ##UTYEAR## Tealium.com Inc. All Rights Reserved.
try {
  (function (id, loader) {
    var u = {};
    utag.o[loader].sender[id] = u;

    // Start Tealium loader 4.32
    // Please do not modify
    if (utag === undefined) { utag = {}; } if (utag.ut === undefined) { utag.ut = {}; } if (utag.ut.loader === undefined) { u.loader = function (o) { var a, b, c, l; a = document; if (o.type === "iframe") { b = a.createElement("iframe"); b.setAttribute("height", "1"); b.setAttribute("width", "1"); b.setAttribute("style", "display:none"); b.setAttribute("src", o.src); } else if (o.type === "img") { utag.DB("Attach img: " + o.src); b = new Image(); b.src = o.src; return; } else { b = a.createElement("script"); b.language = "javascript"; b.type = "text/javascript"; b.async = 1; b.charset = "utf-8"; b.src = o.src; } if (o.id) { b.id = o.id; } if (typeof o.cb === "function") { if (b.addEventListener) { b.addEventListener("load", function () { o.cb(); }, false); } else { b.onreadystatechange = function () { if (this.readyState === "complete" || this.readyState === "loaded") { this.onreadystatechange = null; o.cb(); } }; } } l = o.loc || "head"; c = a.getElementsByTagName(l)[0]; if (c) { utag.DB("Attach to " + l + ": " + o.src); if (l === "script") { c.parentNode.insertBefore(b, c); } else { c.appendChild(b); } } }; } else { u.loader = utag.ut.loader; }
    // End Tealium loader

    u.ev = {'view' : 1, 'link' : 1};

    u.initialized = false;

    ##UTGEN##

    u.send = function(a, b) {
      if (u.ev[a] || u.ev.all !== undefined) {
        //##UTENABLEDEBUG##utag.DB("send:##UTID##");

        var c, d, e, f, i;

        u.data = {
          /* Initialize default tag parameter values here */
          /* Examples: */
          /* "account_id" : "1234567" */
          /* "base_url" : "//insert.your.javascript.library.url.here.js" */
          /* A value mapped to "account_id" or "base_url" in TiQ will replace these default values. */
          "base_url" : "//static.cloud.coveo.com/coveo.analytics.js/2/coveoua.js",
          "coveo_api_key" : "",
          "coveo_website": document.location.hostname,
          "position" : "",
          "product_brand" : "",
          "product_category" : "",
          "product_coupon" : "",
          "product_group" : "",
          "product_id" : "",
          "product_list" : "",
          "product_name" : "",
          "product_price" : "",
          "product_quantity" : "",
          "product_variant" : "",
          "quote_affiliation" : "",
          "quote_id" : "",
          "tealium_event" : "",
          "transaction_affiliation" : "",
          "transaction_coupon" : "",
          "transaction_id" : "",
          "transaction_revenue" : "",
          "transaction_shipping" : "",
          "transaction_tax" : "",
          "currency": ''
        };
        


        /* Start Tag-Scoped Extensions Code */
        /* Please Do Not Edit This Section */
        ##UTEXTEND##
        /* End Tag-Scoped Extensions Code */


        /* Start Mapping Code */
        for (d in utag.loader.GV(u.map)) {
          if (b[d] !== undefined && b[d] !== "") {
            e = u.map[d].split(",");
            for (f = 0; f < e.length; f++) {
              u.data[e[f]] = b[d];
            }
          }
        }
        /* End Mapping Code */


        /* Start Tag Sending Code */

        /* Start Loader Callback Function */
        /* Un-comment the single-line JavaScript comments ("//") to use this Loader callback function. */

        u.loader_cb = function () {
          /* Start Loader Callback Tag Sending Code */
          if (!u.initialized) {
            window['coveoua'] = window['coveoua'] || function () {
                (window['coveoua'].q = window['coveoua'].q || []).push(arguments)
            };
            window['coveoua'].t = Date.now();
            window.coveoua('init', u.data.coveo_api_key);
            window.coveoua('set', 'currencyCode', u.data.currency); //replace CAD value by one provided by Tealium
          }
          u.initialized = true;

          if (a === 'view') {
            window.coveoua('send', 'pageview');
          }

          // Purchase
          if (u.data.tealium_event === 'purchase') {
              for(let i = 0; i < u.data.product_id.length; ++i){
                let products = {};
                products.id = u.data.product_id[i];
                products.name = u.data.product_name[i];
                products.brand = u.data.product_brand[i];
                products.category =  u.data.product_category[i];
                products.price = u.data.product_price[i];
                products.variant = u.data.product_variant[i];
                products.quantity =  u.data.product_quantity[i];
                window.coveoua('ec:addProduct', 
                products
              );
              }
            window.coveoua('ec:setAction', 'purchase', {
              'id': u.data.transaction_id,
              'affiliation': u.data.transaction_affiliation,
              'revenue': u.data.transaction_revenue,
              'tax': u.data.transaction_tax,
              'shipping': u.data.transaction_shipping
            });
            window.coveoua('send', 'event', {
              'context_website': u.data.coveo_website
            });
          }
          
          // Cart Add
          if (u.data.tealium_event === 'cart_add') {
              window.coveoua('ec:addProduct', {
                'id': u.data.product_id,
                'name': u.data.product_name,
                'brand': u.data.product_brand,
                'category': u.data.product_category,
                'price': u.data.product_price,
                'variant': u.data.product_variant,
                'quantity': u.data.product_quantity
              });
            window.coveoua('ec:setAction', 'add');
            window.coveoua('send', 'event', {
              'context_website': u.data.coveo_website
            });
          };

          // Cart Remove
          if (u.data.tealium_event === 'cart_remove') {
              window.coveoua('ec:addProduct', {
                'id': u.data.product_id,
                'name': u.data.product_name,
                'brand': u.data.product_brand,
                'category': u.data.product_category,
                'price': u.data.product_price,
                'variant': u.data.product_variant,
                'quantity': u.data.product_quantity
              });
            window.coveoua('ec:setAction', 'remove');
            window.coveoua('send', 'event', {
              'context_website': u.data.coveo_website
            });
          }

          // Detail View
          if (u.data.tealium_event === 'product_view') {
           window.coveoua('ec:addProduct', {
                'id': u.data.product_id,
                'name': u.data.product_name,
                'brand': u.data.product_brand,
                'category': u.data.product_category,
                'price': u.data.product_price,
                'variant': u.data.product_variant,
                'quantity': u.data.product_quantity
              });
            window.coveoua('ec:setAction', 'detail');
            window.coveoua('send', 'event', {
              'context_website': u.data.coveo_website
            });
          }

          /* End Loader Callback Tag Sending Code */
        };

        /* End Loader Callback Function */


        /* Start Loader Function Call */
        /* Un-comment the single-line JavaScript comments ("//") to use Loader. */

          if (!u.initialized) {
            //u.loader({"type" : "iframe", "src" : u.data.base_url + c.join(u.data.qsp_delim), "cb" : u.loader_cb, "loc" : "body", "id" : 'utag_##UTID##' });
            u.loader({"type" : "script", "src" : u.data.base_url, "cb" : u.loader_cb, "loc" : "script", "id" : 'utag_##UTID##' });
          } else {
            u.loader_cb();
          }

          //u.loader({"type" : "img", "src" : u.data.base_url + c.join(u.data.qsp_delim) });

        /* End Loader Function Call */


        //##UTENABLEDEBUG##utag.DB("send:##UTID##:COMPLETE");
      }
    };
    utag.o[loader].loader.LOAD(id);
  })("##UTID##", "##UTLOADERID##");
} catch (error) {
  utag.DB(error);
}
//end tealium universal tag
