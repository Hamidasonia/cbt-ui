// 'use client';

// type Props = {
//     questionsLength: number;
//     currentIndex: number;
//     answers: (number | null)[];
//     doubtFlags: boolean[];
//     onSelect: (index: number) => void;
// };

// export default function QuestionNavigator({
//     questionsLength,
//     currentIndex,
//     answers,
//     doubtFlags,
//     onSelect,
// }: Props) {
//     const getStatusColor = (index: number) => {
//         if (answers[index] !== null && doubtFlags[index]) return 'bg-orange-400';
//         if (answers[index] !== null) return 'bg-green-500';
//         return 'bg-gray-400';
//     };

//     return (
// <div className="w-64 p-4 bg-white border-r hidden md:block">
// <h2 className="text-lg font-semibold mb-4 text-black">NOMOR SOAL</h2>
// <div className="grid grid-cols-5 gap-2">
// {Array.from({ length: questionsLength }).map((_, index) => (
// <button
// key={index}
// className={w-10 h-10 rounded text-white font-bold ${getStatusColor(index)} ${ currentIndex === index ? 'ring-2 ring-blue-500' : '' }}
// onClick={() => onSelect(index)}
// >
// {index + 1}
// </button>
// ))}
// </div>
// <div className="mt-6 text-sm text-black">
// <div><span className="inline-block w-4 h-4 bg-green-500 mr-2" /> Sudah dijawab</div>
// <div><span className="inline-block w-4 h-4 bg-orange-400 mr-2" /> Ragu-ragu</div>
// <div><span className="inline-block w-4 h-4 bg-gray-400 mr-2" /> Belum dijawab</div>
// </div>
// <button className="mt-6 bg-red-500 text-white py-2 px-4 w-full rounded">
// Hentikan Ujian
// </button>
// </div >
// );
// }