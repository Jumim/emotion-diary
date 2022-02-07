interface emotionItemListType {
  id: number
  name: string
  image: any
}

export const emotionItemList: emotionItemListType[] = [
  { id: 1, name: '완전 좋음', image: process.env.PUBLIC_URL + '/images/emotion1.png' },
  { id: 2, name: '좋음', image: process.env.PUBLIC_URL + '/images/emotion2.png' },
  { id: 3, name: '그럭저럭', image: process.env.PUBLIC_URL + '/images/emotion3.png' },
  { id: 4, name: '나쁨', image: process.env.PUBLIC_URL + '/images/emotion4.png' },
  { id: 5, name: '끔찍함', image: process.env.PUBLIC_URL + '/images/emotion5.png' }
];
