 /**
功能：将香港/台湾节点提到前面

在订阅链接后面添加任意参数即可触发解析器（比如 #sort=1）
*/

// 获取原始内容
let content = $resource.content;

// 按行分割
let lines = content.split('\n');

// 分类：香港台湾节点 和 其他节点
let hktwNodes = [];  // 香港台湾节点
let otherNodes = []; // 其他节点

lines.forEach(line => {
    // 跳过空行
    if (line.trim() === '') {
        return;
    }

    // 判断是否包含"香港"或"台湾"
    if (line.includes('香港') || line.includes('台湾')) {
        hktwNodes.push(line);
    } else {
        otherNodes.push(line);
    }
});

// 合并：香港台湾在前，其他在后
let sortedContent = [...hktwNodes, ...otherNodes].join('\n');

// 返回处理后的内容
$done({ content: sortedContent });
