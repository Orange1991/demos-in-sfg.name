<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html>
  <head>
    <base href="<%=basePath%>">
  
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    
    <title>Editormd-upload-img-by-jsp</title>
    
    <!-- Editor.md style -->
    <link rel="stylesheet" href="<%=basePath%>css/editormd.css" />

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    
  </head>
  <body>
    
    <section class="content">
      <div class="box box-primary">
        <form role="form">
          <div class="box-body">
            <div class="form-group">
              <div id="editormd">
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
    <script src="<%=basePath%>js/jquery.1.11.3.min.js"></script>
    <script src="<%=basePath%>js/editormd.js"></script>   
    <script type="text/javascript">
     var testEditor;

      $(function() {
        testEditor = editormd("editormd", {
          width   : "100%",
          height  : 640,
          syncScrolling : "single",
          path : '<%=basePath%>editormd/lib/',
          codeFold : true,
          saveHTMLToTextarea : true, // 保存 HTML 到 Textarea
          searchReplace : true,
          htmlDecode : "style,script,iframe|on*", // 开启 HTML 标签解析，为了安全性，默认不开启    
          emoji : true,
          taskList : true,
          imageUpload : true,
          imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
          imageUploadURL : "<%=basePath%>editormd/jsp/upload.jsp",
          uploadCallbackURL: "<%=basePath%>editormd/jsp/upload_callback.jsp",
        });
         
      });
    </script>
  </body>
</html>