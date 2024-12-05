import torrent1337x from './1337x'
import bitSearch from './bitSearch'
import ezTV from './ezTV'
import glodls from './gloTorrents'
import kickAss from './kickAss'
import limeTorrent from './limeTorrent'
import magnet_dl from './magnet_dl'
import nyaaSI from './nyaaSI'
import pirateBay from './pirateBay'
import rarbg from './rarbg'
import torLock from './torLock'
import torrentFunk from './torrentFunk'
import torrentGalaxy from './torrentGalaxy'
import torrentProject from './torrentProject'
import yts from './yts'
import zooqle from './zooqle'

import type { TorrentData as _1337xTorrentData } from './1337x'
import type { TorrentData as BitSearchTorrentData } from './bitSearch'
import type { TorrentData as ETTVTorrentData } from './ettv'
import type { TorrentData as EzTVTorrentData } from './ezTV'
import type { TorrentData as GloTorrentData } from './gloTorrents'
import type { TorrentData as KickAssTorrentData } from './kickAss'
import type { TorrentData as LimeTorrentData } from './limeTorrent'
import type { TorrentData as MagnetDlTorrentData } from './magnet_dl'
import type { TorrentData as NyaaSITorrentData } from './nyaaSI'
import type { TorrentData as PirateBayTorrentData } from './pirateBay'
import type { TorrentData as RarGBTorrentData } from './rarbg'
import type { TorrentData as TorLockTorrentData } from './torLock'
import type { TorrentData as TorrentFunkTorrentData } from './torrentFunk'
import type { TorrentData as TorrentGalaxyTorrentData } from './torrentGalaxy'
import type { TorrentData as TorrentProjectTorrentData } from './torrentProject'
import type { TorrentData as YtsTorrentData } from './yts'
import type { TorrentData as ZoogleTorrentData } from './zooqle'

export type TorrentData =
  | _1337xTorrentData
  | BitSearchTorrentData
  | ETTVTorrentData
  | EzTVTorrentData
  | GloTorrentData
  | KickAssTorrentData
  | LimeTorrentData
  | MagnetDlTorrentData
  | NyaaSITorrentData
  | PirateBayTorrentData
  | RarGBTorrentData
  | TorLockTorrentData
  | TorrentFunkTorrentData
  | TorrentGalaxyTorrentData
  | TorrentProjectTorrentData
  | YtsTorrentData
  | ZoogleTorrentData

export default async function combo(query = '', page?: number) {
  let comboTorrent: TorrentData[][] = []
  await Promise.all([
    torrentGalaxy(query, page),
    nyaaSI(query, page),
    yts(query, page),
    pirateBay(query, page),
    torLock(query, page),
    ezTV(query),
    torrent1337x(query, page),
    rarbg(query, page),
    zooqle(query, page),
    kickAss(query, page),
    bitSearch(query, page),
    glodls(query, page),
    magnet_dl(query, page),
    limeTorrent(query, page),
    torrentFunk(query, page),
    torrentProject(query, page),
  ]).then(
    ([
      tgx,
      nyaasi,
      yts,
      piratebay,
      torlock,
      eztv,
      x1337,
      rarbg,
      zql,
      kick,
      bts,
      glo,
      mg_dl,
      lmt,
      tfk,
      tpj,
    ]) => {
      if (tgx !== null && tgx.length > 0) {
        comboTorrent.push(tgx)
      }
      if (nyaasi !== null && nyaasi.length > 0) {
        comboTorrent.push(nyaasi)
      }
      if (yts !== null && yts.length > 0) {
        comboTorrent.push(yts)
      }
      if (piratebay !== null && piratebay.length > 0) {
        comboTorrent.push(piratebay)
      }
      if (torlock !== null && torlock.length > 0) {
        comboTorrent.push(torlock)
      }
      if (eztv !== null && eztv.length > 0) {
        comboTorrent.push(eztv)
      }
      if (x1337 !== null && x1337.length > 0) {
        comboTorrent.push(x1337)
      }
      if (rarbg !== null && rarbg.length > 0) {
        comboTorrent.push(rarbg)
      }
      if (zql !== null && zql.length > 0) {
        comboTorrent.push(zql)
      }
      if (kick !== null && kick.length > 0) {
        comboTorrent.push(kick)
      }
      if (bts !== null && bts.length > 0) {
        comboTorrent.push(bts)
      }
      if (glo !== null && glo.length > 0) {
        comboTorrent.push(glo)
      }
      if (mg_dl !== null && mg_dl.length > 0) {
        comboTorrent.push(mg_dl)
      }
      if (lmt !== null && lmt.length > 0) {
        comboTorrent.push(lmt)
      }
      if (tfk !== null && tfk.length > 0) {
        comboTorrent.push(tfk)
      }
      if (tpj !== null && tpj.length > 0) {
        comboTorrent.push(tpj)
      }
    },
  )
  return comboTorrent.flat()
}
