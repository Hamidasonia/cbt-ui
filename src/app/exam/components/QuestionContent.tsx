// type Props = {
//     question: string;
//     options: string[];
//     selected: number | null;
//     onSelect: (optIndex: number) => void;
//     onPrev: () => void;
//     onNext: () => void;
//     onToggleDoubt: () => void;
//     isFirst: boolean;
//     isLast: boolean;
//     number: number;
// };

// export default function QuestionContent({
//     question,
//     options,
//     selected,
//     onSelect,
//     onPrev,
//     onNext,
//     onToggleDoubt,
//     isFirst,
//     isLast,
//     number,
// }: Props) {
//     return (
//         <div className="bg-white rounded shadow p-4 md:p-6">
//             <div className="flex justify-between mb-4">
//                 <h3 className="text-xl font-semibold text-black">SOAL NO. {number}</h3>
//                 <div className="hidden md:block text-sm bg-gray-200 px-3 py-1 rounded text-black">
//                     SISA WAKTU 01:13:23
//                 </div>
//             </div>
//             <p className="mb-4 text-black">{question}</p>
//             <div className="space-y-3">
//                 {options.map((opt, i) => (
//                     <label key={i} className="flex items-center space-x-2 text-black">
//                         <input
//                             type="radio"
//                             name={question - ${number}}
//                         checked={selected === i}
//                         onChange={() => onSelect(i)}
// />
//                         <span>{opt}</span>
//                     </label>
//                 ))}
//             </div>
//             <div className="mt-6 flex flex-col sm:flex-row justify-between gap-2">
//                 <button
//                     className="bg-blue-500 text-white px-4 py-2 rounded"
//                     disabled={isFirst}
//                     onClick={onPrev}
//                 >
//                     ❮ SEBELUMNYA
//                 </button>
//                 <button className="bg-orange-400 text-white px-4 py-2 rounded" onClick={onToggleDoubt}>
//                     RAGU-RAGU
//                 </button>
//                 <button
//                     className="bg-blue-500 text-white px-4 py-2 rounded"
//                     disabled={isLast}
//                     onClick={onNext}
//                 >
//                     SELANJUTNYA ❯
//                 </button>
//             </div>
//         </div>
//     );
// }