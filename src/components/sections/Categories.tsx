import Image from 'next/image';

const category = [
    { id: 1, name: 'Healthcare', image: '/8cae3786c4cd68fd83c5945179c3152d7324384d-1799x1200.jpg' },
    { id: 2, name: 'Health Supplement', image: '/Blister-Packaging-Material-for-tablet-and-capsule.jpg' },
    { id: 3, name: 'Medical Device', image: '/__opt__aboutcom__coeus__resources__content_migration__mnn__images__2017__06__prescription-medications-a342aa54ec704f638b5c01de326c89cd.jpg' },
    { id: 4, name: 'Milk', image: '/images.png' },
    { id: 5, name: 'Baby Care', image: '/8cae3786c4cd68fd83c5945179c3152d7324384d-1799x1200.jpg' },
    { id: 6, name: 'Personal Care', image: '/Blister-Packaging-Material-for-tablet-and-capsule.jpg' },
    { id: 7, name: 'OTC', image: '/__opt__aboutcom__coeus__resources__content_migration__mnn__images__2017__06__prescription-medications-a342aa54ec704f638b5c01de326c89cd.jpg' }
];

export default function Categories() {
    return (
        <section className="mt-8 border border-slate-200 bg-white p-6 md:mt-10 md:px-30">
            {/* Header */}
            <div className="flex flex-col">
                <p className="text-2xl font-semibold text-[#780000] uppercase">
                    Shop by Categories
                </p>
                <h2 className="text-lg font-light text-slate-600">
                    View all products per category
                </h2>
            </div>

            {/* Grid */}
            <div className="flex flex-wrap justify-center gap-10 mt-6">
                {category.map((item) => (
                    <div
                        key={item.id}
                        className="group cursor-pointer w-[calc(50%-20px)] sm:w-[calc(33.333%-27px)] md:w-[calc(25%-30px)]"
                    >
                        {/* Image Card */}
                        <div className="relative w-full h-40 rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* Label */}
                        <p className="mt-3 text-center text-sm font-medium text-slate-800 group-hover:text-[#780000] transition-colors">
                            {item.name}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}