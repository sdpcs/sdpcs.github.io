<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];

    // 设置收件人的电子邮件地址
    $to = "zhuohaipeng17@outlook.com";

    // 设置电子邮件主题和内容
    $subject = "加入关机党申请";
    $message = "姓名: " . $name;

    // 设置邮件头部
    $headers = "From: webmaster@michaelzhuo.github.io";

    // 使用邮件函数发送电子邮件
    mail($to, $subject, $message, $headers);

    // 可以在这里进行进一步的处理，比如将数据保存到数据库等

    // 返回响应
    echo "表单提交成功！";
} else {
    // 处理非POST请求的情况
    echo "无效的请求";
}
?>
