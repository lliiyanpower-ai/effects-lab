const fs = require('fs');
const path = require('path');

const effectsDir = path.join(process.cwd(), 'effects');
const outputFile = path.join(process.cwd(), 'data.json');

// 获取所有特效文件夹
const folders = fs.readdirSync(effectsDir).filter(f => 
    fs.statSync(path.join(effectsDir, f)).isDirectory()
);

const effectsData = folders.map(folder => {
    const indexPath = path.join(effectsDir, folder, 'index.html');
    // 默认元数据
    let meta = {
        title: folder.replace(/-/g, ' '),
        tags: ["Canvas"],
        description: "交互特效描述"
    };

    // 如果文件夹里有 config.json，就读取它
    const configPath = path.join(effectsDir, folder, 'config.json');
    if (fs.existsSync(configPath)) {
        meta = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    }

    return {
        id: folder,
        ...meta,
        path: `effects/${folder}/index.html`,
        preview: `effects/${folder}/preview.mp4`
    };
});

fs.writeFileSync(outputFile, JSON.stringify(effectsData, null, 2));
console.log('✅ 索引生成成功！');
