/**
功能：将"服务有效"节点排最前，香港/台湾节点其次，其他节点最后

在订阅链接后面添加任意参数即可触发解析器（比如 #sort=1）
*/

// 获取原始内容
let content = $resource.content;

// 按行分割
let lines = content.split('\n');

// 分类：三个优先级
let serviceNodes = []; // 服务有效节点（最高优先级）
let hktwNodes = [];    // 香港台湾节点
let otherNodes = [];   // 其他节点

lines.forEach(line => {
    // 跳过空行
    if (line.trim() === '') {
        return;
    }

    // 判断是否包含"服务有效"（tag=服务有效XXX）
    if (line.includes('服务有效')) {
        serviceNodes.push(line);
    }
    // 判断是否包含"香港"或"台湾"
    else if (line.includes('香港') || line.includes('台湾')) {
        hktwNodes.push(line);
    } else {
        otherNodes.push(line);
    }
});

// 合并：服务有效在最前，香港台湾其次，其他在后
let sortedContent = [...serviceNodes, ...hktwNodes, ...otherNodes].join('\n');

// 返回处理后的内容
$done({ content: sortedContent });
