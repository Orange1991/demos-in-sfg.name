<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*,java.io.*" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="org.apache.commons.fileupload.*" %>
<%@ page import="org.apache.commons.fileupload.disk.*" %>
<%@ page import="org.apache.commons.fileupload.servlet.*" %>
<%@ page import="org.json.simple.*" %>
<%@ page import="org.apache.struts2.dispatcher.multipart.MultiPartRequestWrapper" %>

<%
// 文件保存目录路径
// 存放在relativePath下
String relativePath = "/upload/img/";

// 文件保存路径（绝对路径）
String savePath = request.getSession().getServletContext().getRealPath("/") + relativePath;

// 文件保存路径（相对路径）
String saveUrl = request.getContextPath() + relativePath;

// 允许最大上传文件大小 struts.xml struts.multipart.maxSize=3G
long maxSize = 3000000000l;

response.setContentType("text/html; charset=UTF-8");

//检查保存目录
File uploadDir = new File(savePath);
if (!uploadDir.exists()) {
	uploadDir.mkdirs();
} else if(!uploadDir.isDirectory()){
  redirect(response, 0, "message=上传目录不存在");
  return;
}

//检查目录写权限
if(!uploadDir.canWrite()){
  redirect(response, 0, "message=上传目录没有写权限");
  return;
}

MultiPartRequestWrapper wrapper = (MultiPartRequestWrapper) request;

//form表单中自带的guid（前端生成的输入框id）
String guid = wrapper.getParameter("guid");

// 获得上传的文件名
String fileName = wrapper.getFileNames("editormd-image-file")[0];
// 获得文件过滤器
File file = wrapper.getFiles("editormd-image-file")[0];


//重构上传图片的名称
//扩展名
String fileExt = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
//重命名
SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
String newImgName = df.format(new Date()) + "_" + new Random().nextInt(1000) + "." + fileExt;   

// 检查文件大小
if (file.length() > maxSize) {
    redirect(response, 0, "message=上传文件大小超过限制");
    return;
}

// 上传
byte[] buffer = new byte[1024];
// 获取文件输出流
FileOutputStream fos = new FileOutputStream(savePath +"/" + newImgName);
// 获取内存中当前文件输入流
InputStream in = new FileInputStream(file);
try {
    int num = 0;
    while ((num = in.read(buffer)) > 0) {
        fos.write(buffer, 0, num);
    }
} catch (Exception e) {
    e.printStackTrace(System.err);
} finally {
    in.close();
    fos.close();
}

// 跳转
// params参数：
//   message 上传结果提示语
//   guid    前端输入框id（用于在回调页中查找对应输入框，以便在对应输入框中插入图片的路径）
//   url     图片相对路径（在回调页中，作为插入到对应输入框中的值）
redirect(response, 1, "message=上传成功&guid=" + guid + "&url=" + saveUrl + newImgName);

%>

<%!
/**
 * 跳转至上传结果处理界面
 *
 * @param response {HttpServletResponse} 响应对象
 * @param code     {int}                 上传结果代码 1-成功，0-失败
 * @param params   {String}              跳转参数
 */
private void redirect(HttpServletResponse response, int code, String params) throws Exception {
	 response.sendRedirect("upload_callback.jsp" + "?success=" + code + "&" + params);
}
%>   