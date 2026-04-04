import { SourceType } from "@/types"
import ArtikelEditorPage from "../../_components/ArtikelEditorPage"

export const metadata = {
  title: "Artikel Editor"
};

type Props = {
    params: Promise<{ source_type: SourceType; slug_address: string }>
}

export default async function Page({ params }: Props) {
    const { source_type, slug_address } = await params
    return <ArtikelEditorPage source_type={source_type} slug_address={slug_address} />
}