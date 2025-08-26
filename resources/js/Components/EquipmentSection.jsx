import React from "react";
import { Button } from "../components/ui/button";


export default function EquipmentSection({ isVisible }) {
const [previewOpen, setPreviewOpen] = React.useState(false);

return (
    <section id="equipment" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
            {/* Title */}
            <div
                id="equipment-cta"
                data-animate
                className={`text-center mt-12 transition-all duration-1000 ${
                    isVisible("equipment-cta") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 max-w-4xl mx-auto">
                    <img
                        src="/images/perlengkapan.jpg"
                        alt="Perlengkapan haji lengkap, terdiri dari koper, tas, dan perlengkapan ibadah, ditata rapi di ruangan terang dengan nuansa hangat dan nyaman."
                        className="cursor-pointer"
                        onClick={() => setPreviewOpen(true)}
                    />
                    <div className="flex flex-col sm:flex-row gap-4 justify-center"></div>
                </div>
            </div>
            {/* Preview Modal */}
            {previewOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
                    onClick={() => setPreviewOpen(false)}
                >
                    <div
                        className="bg-white rounded-lg p-4 max-w-lg w-full relative"
                        onClick={e => e.stopPropagation()}
                    >
                        <img
                            src="/images/perlengkapan.jpg"
                            alt="Preview perlengkapan haji"
                            className="w-full h-auto rounded"
                        />
                        <Button
                            className="absolute top-2 right-2"
                            onClick={() => setPreviewOpen(false)}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            )}
        </div>
    </section>
);
}
