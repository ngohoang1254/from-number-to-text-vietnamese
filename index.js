export function toTextVietnamese(number) {
    let numberString = ""
    if (typeof number === "string") {
        numberString = number;
    }
    else {
        numberString = number.toString();
    }
    if (numberString?.length > 0) {
        const list = ['', 'MỘT', 'HAI', 'BA', 'BỐN', 'NĂM', 'SÁU', 'BẢY', 'TÁM', 'CHÍN'];
        const listUnit = ['TRĂM', 'MƯƠI', ''];
        const scale = ['NGHÌN', 'TRIỆU', 'TỶ'];

        const blocks = [];
        for (let i = numberString.length; i >= 0; i -= 3) {
            if (i - 3 >= 0) {
                const number = numberString.slice(i - 3, i);
                if (number) {
                    blocks.unshift(number);
                }
            } else {
                const number = numberString.slice(0, i);
                if (number) {
                    blocks.unshift(number);
                }
            }
        }
        let string = '';
        for (let i = 0; i < blocks.length; i++) {
            for (let j = 0; j < blocks[i].length; j++) {
                // string += `${list[Number(blocks[i][j])]} `
                //Trường hợp cả blocks = 0
                if (Number(blocks[i]) === 0) {
                } else if (blocks[i].length === 3 && Number(blocks[i]) < 10 && j == blocks[i].length - 1) {
                    string += ` LẺ ${list[Number(blocks[i])]} `;
                }
                //Trường hợp không trăm
                else if (blocks[i][j] === '0' && j === blocks[i].length - 3) {
                    string += ' KHÔNG TRĂM ';
                }
                //Trường hợp số 1 ở hàng chục
                else if (blocks[i][j] === '1' && j === blocks[i].length - 2) {
                    string += ' MƯỜI ';
                }
                //Trường hợp số 1 ở hàng đơn vị
                else if (
                    blocks[i][j] === '1' &&
                    j === blocks[i].length - 1 &&
                    blocks[i].length - 1 !== 0 &&
                    blocks[i][j - 1] !== '0' &&
                    blocks[i][j - 1] !== '1'
                ) {
                    string += ' MỐT ';
                }
                //Trường hợp số 5 ở hàng đơn vị
                else if (
                    blocks[i][j] === '5' &&
                    j === blocks[i].length - 1 &&
                    blocks[i].length - 1 !== 0 &&
                    blocks[i][j - 1] !== '0'
                ) {
                    string += 'LĂM ';
                } else {
                    if (Number(blocks[i][j]) === 0) {
                    } else {
                        string += `${list[Number(blocks[i][j])] + ' ' + listUnit[j + (3 - blocks[i].length)]} `;
                    }
                }
            }
            if (Number(blocks[i]) === 0) {
            } else if (blocks.length > 1 && i !== blocks.length - 1) {
                string += `${scale[(blocks.length - i - 2) % 3]} `;
            }
        }
        string = string.replaceAll("  ", " ");
        return string;
    } else {
        return '';
    }
}