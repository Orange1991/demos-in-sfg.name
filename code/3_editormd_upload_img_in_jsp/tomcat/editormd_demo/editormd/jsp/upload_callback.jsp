<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String result = (String) session.getAttribute("uploadResult");
%>
<!DOCTYPE html>
<html lang="zh">
    <head>
        <meta charset="utf-8" />
    </head>
    <body>
    	<!--
         这是同域下的callback页面，本页面在iframe内，所以只要通过window.parent就能操作父窗口的元素 
        -->
        <script type="text/javascript"> 
           var query = {};
            // 获取上传结果参数
           var urlParams = window.location.search.split('?')[1];
            urlParams = urlParams.split("&");
            for (var i = 0; i< urlParams.length; i++) {
                var param  = urlParams[i].split("="); 
                query[param[0]] = param[1]; 
            }
            
            query['dialog_id'] = 'editormd-image-dialog-' + query['guid'];
            var imageDialog = window.parent.document.getElementById(query['dialog_id']);
            
            if (parseInt(query['success']) === 1) {
                imageDialog.querySelector("[data-url]").value = query['url'];
            } else {
                alert(query['message']);
            }

            location.href = "about:blank";
        </script>        
    </body>   
</html>