"use client"

import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, PencilLineIcon, RssIcon, TagsIcon, TvMinimalPlayIcon } from "lucide-react";
import { ArtikelKard } from "@/types/modules/artikel";
import { arrayStringify, capitalize, formatTanggalIndo } from "@/utils";
import { ANIME_TYPE } from "@/types";

interface ArtikelCardProps {
  data: ArtikelKard;
}

export function ArtikelCard({ data }: ArtikelCardProps) {
  return (
    <Link href={`/${data.source_type}/${data.slug}`} className="
      border p-2 border-tersier shadow rounded-lg 
      transition-all 
      hover:scale-[1.01] hover:shadow-lg hover:border-primer
    ">
      {/* JUDUL < SM */}
      <div className="sm:hidden mb-3">
        <h3 className="text-lg font-bold text-primer line-clamp-3 break-words mb-1">{data.title}</h3>
        <div className="text-xs text-tersier flex items-center gap-1">
          <PencilLineIcon size={15} />
          <p>{formatTanggalIndo(data.created_at)}</p>
        </div>
      </div>

      <div className="flex gap-3 items-start">

        {/* IMAGE */}
        <section className="w-28 shrink-0 flex flex-col">
          <Image
            src={data.source.image_url}
            alt={data.source.title}
            width={112}
            height={168}
            className="rounded object-cover"
          />
        </section>

        {/* METADATA & DESKRIPSI */}
        <section className="flex flex-col flex-1 gap-2">
          {/* JUDUL >= SM */}
          <div className="hidden sm:block">
            <h3 className=" text-lg font-bold text-primer line-clamp-2 break-words mb-1">{data.title}</h3>
            <div className="hidden sm:flex text-xs text-tersier items-center gap-1">
              <PencilLineIcon size={15} />
              <p>{formatTanggalIndo(data.created_at)}</p>
            </div>
          </div>

          {/* INFO */}
          <div className="flex flex-wrap gap-2 text-sm text-tersier">
            <span className="flex gap-1 text-xs">
              <TvMinimalPlayIcon size={18} />
              {capitalize(data.source.media_type) ?? '--'} {data.source.media_type === ANIME_TYPE.TV ? capitalize(data.source.source_type) : ''}
            </span>
            <span className="flex gap-1 text-xs">
              <RssIcon size={18} />
              {data.source.season ? `${capitalize(data.source.season)},` : ''} {capitalize(data.source.month)} {data.source.year}
            </span>
            <span className="flex gap-1 text-xs">
              <TagsIcon size={18} />
              {arrayStringify(data.source.genres) ?? '--'}
            </span>
          </div>


          {/* DESKRIPSI */}
          <p className="text-base text-gray-500 line-clamp-3 break-words">{data.short_description}</p>

          {/* READ MORE */}
          <div className="text-xs text-tersier underline inline-flex items-center justify-start transition-all hover:scale-105 hover:translate-x-1 origin-left">
            <p>Baca Selengkapnya</p>
            <ArrowRightIcon className="ml-1 w-4" />
          </div>

          {/* TAGS >= SM */}
          <div className="mt-2 text-sm hidden sm:flex flex-wrap gap-2">
            {data.tags?.map(tag => (
              <span key={tag} className="
                text-xs text-white text-center bg-sekunder px-2 py-1 rounded border border-sekunder
                transition-all 
                hover:scale-105 hover:bg-white hover:text-primer hover:border-sekunder
              ">
                {capitalize(tag)}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* TAGS < SM */}
      <div className="sm:hidden text-sm flex flex-wrap gap-2 mt-4 mb-1">
        {data.tags?.map(tag => (
          <span key={tag} className="
            text-xs text-white text-center bg-sekunder px-2 py-1 rounded border border-sekunder
            transition-all 
            hover:scale-105 hover:bg-white hover:text-primer hover:border-sekunder
          ">
            {capitalize(tag)}
          </span>
        ))}
      </div>
    </Link>
  )
}

export default ArtikelCard;