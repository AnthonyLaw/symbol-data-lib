/*
 *
 * Copyright (c) 2019-present for NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License ");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import expect from 'expect.js'
import MongoDb from 'mongodb'
import mongo from '../../src/codec/mongo'

// Create MongoDB ObjectID from hex.
const object = hex => new MongoDb.ObjectID(hex)

// Create MongoDB binary from hex
const binary = hex => new MongoDb.Binary(Buffer.from(hex, 'hex'))

// Create MongoDB long.
const long = (lo, hi) => new MongoDb.Long(lo, hi)

describe('mongo', () => {
  describe('accountRestrictions', () => {
    it('should parse a valid account restriction', () => {
      let item = {
        accountRestrictions: {
            address: binary('98AE5B94F7911CB302FE78E9CFDE21EF5A47174628055AC3AA'),
            restrictions: [
              {
                restrictionFlags: 0x1,
                values: [
                  binary('983DA4AEC0AE94124F3BC0147615FA6FF1E095DA58C815DB53')
                ]
              },
              {
                restrictionFlags: 0x8002,
                values: [
                  binary('2FF881484A4D817D'),
                  binary('80781853CA114345')
                ]
              },
              {
                restrictionFlags: 0xC004,
                values: [
                  binary('4E42')
                ]
              }
            ]
        }
      }
      expect(mongo.accountRestrictions(item)).to.eql({
        accountRestrictions: {
          address: 'TCXFXFHXSEOLGAX6PDU47XRB55NEOF2GFACVVQ5K',
          restrictions: [
            {
              restrictionFlags: 1,
              values: [
                'TA62JLWAV2KBETZ3YAKHMFP2N7Y6BFO2LDEBLW2T'
              ]
            },
            {
              restrictionFlags: 0x8002,
              values: [
                '7D814D4A4881F82F',
                '454311CA53187880'
              ]
            },
            {
              restrictionFlags: 0xC004,
              values: [
                0x424E
              ]
            }
          ]
        }
      })
    })
  })

  describe('accounts', () => {
    it('should parse a valid account', () => {
      let item = {
        account: {
          address: binary('98AE5B94F7911CB302FE78E9CFDE21EF5A47174628055AC3AA'),
          addressHeight: long(1, 0),
          publicKey: binary('0000000000000000000000000000000000000000000000000000000000000000'),
          publicKeyHeight: long(0, 0),
          accountType: 0,
          linkedAccountKey: binary('0000000000000000000000000000000000000000000000000000000000000000'),
          importances: [
            {
              value: long(2398580345, 86526),
              height: long(88846)
            }
          ],
          activityBuckets: [
            {
              startHeight: long(88846, 0),
              totalFeesPaid: long(0, 0),
              beneficiaryCount: 0,
              rawScore: long(2398580345, 86526)
            }
          ],
          mosaics: [
            {
              id: long(92423592, 1370066984),
              amount: long(833619904, 91176)
            }
          ]
        }
      }
      expect(mongo.accounts(item)).to.eql({
        account: {
          address: 'TCXFXFHXSEOLGAX6PDU47XRB55NEOF2GFACVVQ5K',
          addressHeight: '1',
          publicKey: '0000000000000000000000000000000000000000000000000000000000000000',
          publicKeyHeight: '0',
          accountType: 0,
          linkedAccountKey: '0000000000000000000000000000000000000000000000000000000000000000',
          importances: [
            {
              height: '88846',
              value: '371628738834041'
            }
          ],
          activityBuckets: [
            {
              beneficiaryCount: 0,
              rawScore: '371628738834041',
              startHeight: '88846',
              totalFeesPaid: '0'
            }
          ],
          mosaics: [
            {
              amount: '391598771800000',
              mosaicId: '51A99028058245A8'
            }
          ]
        }
      })
    })
  })

  describe('addressResolutionStatements', () => {
    it('should parse a valid address resolution statement', () => {
      let item = {
        statement : {
          height : long(31929, 0),
          unresolved : binary('992BE6B9E9B101B8BB00000000000000000000000000000000'),
          resolutionEntries : [
            {
              source: {
                primaryId: 1,
                secondaryId: 0
              },
              resolved: binary('987FE7471CC37FB9D896B8B22F777F43B329C5C1C266C6D5B7')
            }
          ]
        }
      }
      expect(mongo.addressResolutionStatements(item)).to.eql({
        statement : {
          height: '31929',
          unresolved : 'TEV6NOPJWEA3ROYAAAAAAAAAAAAAAAAAAAAAAAAA',
          resolutionEntries : [
            {
              source: {
                primaryId: 1,
                secondaryId: 0
              },
              resolved: 'TB76ORY4YN73TWEWXCZC6537IOZSTROBYJTMNVNX'
            }
          ]
        }
      })
    })
  })

  describe('blocks', () => {
    it('should parse a valid block', () => {
      let item = {
        meta: {
          hash: binary('6E5DC4D3B6027AA2CF77CCD0222DE9E85536385829C72D77189F214C1AC81098'),
          generationHash: binary('45870419226A7E51D61D94AD728231EDC6C9B3086EF9255A8421A4F26870456A'),
          totalFee: long(0, 0),
          stateHashSubCacheMerkleRoots: [
            binary('E3E56D1079CEF577298C7C68EC42A11690F87A37D362B10C0B00FF0F61849A48'),
            binary('E5228B463E386B75AA4AE191C7026324361644E2A6C69539CDCF18A1BD92BF3E'),
            binary('D35D32632B024FF6B87E9D8ECC7E23C6079CEE7CFF0F45E70503749B84AD157F'),
            binary('0000000000000000000000000000000000000000000000000000000000000000'),
            binary('0000000000000000000000000000000000000000000000000000000000000000'),
            binary('0000000000000000000000000000000000000000000000000000000000000000'),
            binary('0000000000000000000000000000000000000000000000000000000000000000'),
            binary('0000000000000000000000000000000000000000000000000000000000000000'),
            binary('0000000000000000000000000000000000000000000000000000000000000000')
          ],
          numTransactions: 43,
          transactionMerkleTree: [
            binary('1F4B55D42C9C91805E73317319DDDA633667D5E44EB0F03678FF7F130555DF4B'),
            binary('FC43D8029D448AC71F4C3751DADAE451CB8115285382F555B8D752FB80A5B2A6'),
            binary('33BC10D8B818B90F12062C1022C4C553892C2F6187A8FC06F149B7FBE5D50B6A'),
            binary('EEE6421C3397A937068F9C09B172221DC77B5C695D504B50291F328C97325DF1'),
            binary('EAB74892D6FC2040FF20CDBD5E2497B27BB9B63AA47F619D7F18E2124C3A831A'),
            binary('6442E6466B6B57B3D7038A02D45639727D8C89A8A5C3014ABD6FF153D34035D8'),
            binary('89A988E320CFD0430A529AFAA2791FDAC7E2EC4923737E1038FBB4B58A0D4C38'),
            binary('73C2DF0C98A2B6C49E4CD9B217E7513520CD7BF73065A536C088FB2A3ED8F97C'),
            binary('2842E1A0A146729D0B479520425131607B7D520A7DF63B7EB9A266ADC7FDB6BC'),
            binary('77EB1324C8685C50189635C9575F3E1F0D74080243C6544D08345635EC564716'),
            binary('DFF9FAF6E65F331BD15CD627CD4808789B2DEE18E10B86B53E9B2FECA51A207D'),
            binary('686A55F731854FD78620C8CB8FB3A61DA14701804A5778680459BE3DF2737B0D'),
            binary('91D97513486EEA87D71030CCF6C6A91E3A421CB0C9D0B013746188494F44954D'),
            binary('5603D1EC65D0EA203C51D63D0625217EC6DC06A85FE371785F5632426604BF7A'),
            binary('0D94E5A76816644C8467B2B7E15D62578667AF6D6E4C96E7C08183586F58DD01'),
            binary('DA1685AFDCA12C3E96534D7C3D001128C7A3A698C88EAB4E6A1E87A4998F9882'),
            binary('9090E958C5C32F3C85DD28503741C4C5A96C4D996246B6C7999CB101BB51C058'),
            binary('32591C7F2903AA7CDE631C127050924C572ED0954B580293BE9B7B044EC2326A'),
            binary('F5DF45ED9DF55B0180B21E7C4B07AF01330EB561E7D6DCCE91EA624EB1668936'),
            binary('AB58B3360754D68D6EA1D6615C2FF1D607E452D2873B1C8E8CDBDE5B1C6C6A5D'),
            binary('646BB4C7C41877856C4594F7D92C5F3AAE6D83B776FCBFD7B026D7240DD97775'),
            binary('CD38BA3C5C7809BEF002A868A6A79415433426526A70AD00BECB91B0E3FE2C40'),
            binary('5E7E45CCD51589060EEE41EC4ED404458AB712A98F7AAA288C24643650CCC562'),
            binary('C9F81C652FD472FBD2EE92F2B9FED0994AF3D99C58D465AFC3537694A486824A'),
            binary('73D955551F9DE20EF420716502931017EB470D76AD078865CA4B82A3BBA8A964'),
            binary('769AD1139E22C1C459CD7D65BB876D839DE9867581A84A07DA494E94F2CE9BEB'),
            binary('4CC89908CB19C7EE9676030567D6DB2A1C8CB403439F454E0012FE2D07A44471'),
            binary('C3E9783DD0BE8C85DD25085E258315F4C2074CD22127DDB66A8CA6A9539B0543'),
            binary('7667AE4412DE6B08BDFF4F16CBB7C217E000E60543EBE62D07D1245B03C79FED'),
            binary('FDAAE85BEAE1AC514FC9BE40797C09FD4416426F3409F50FEA56339D39874239'),
            binary('AA520E6B1B7FFB7AC03983047FD3AD1E76B62935DB198FF209A5C00AB7E8B4A0'),
            binary('672A1BBA8DF0FCF8335F4B64629F2883C911658BBA4EDBAFB4D38D49E83D00FB'),
            binary('2FADB3DD2B4CDB5CEAA70222861791BA44C78ABFDB2E2338348F525EAF1819DA'),
            binary('4DCCB5DE619D4EC547C19168E0CB3064B54F51B87763EFE6D63E15B3778357B1'),
            binary('4014B2E29E7878C7DD7AF8B2D64DC2C0D52D706157945238C63EC4CD439E93C4'),
            binary('C4D9FD40476A3427A647D77DB13F0D056177156AD947F05B942BF0024D8E5397'),
            binary('317A29174CA361E7F837ACF586B0D81BB6067A85F30F61AECEF9901488FACC90'),
            binary('8413E255AC2DAA75ACC70051E34CEB338B15A47F87013A4EF6D15F76A0EE9477'),
            binary('873FD52211E126E29A9A7F1EF5FF31CB81EAE1300E39D409C0A30ECAC98688FD'),
            binary('6134D37D00F3B7419DBDBF7DC2CAEFEEC9FA4EE938F22A0AB7B527BE1834F4A8'),
            binary('C53FCCDF5B3DAA41D919CD727645B66AACB39A57A5DFB54DC1A8BF102007B1CE'),
            binary('D0206F2F2C4C30777698378F0BD92491648A757454CEA4581F753AD9AB886D18'),
            binary('D88D60D221D69BF4EBEAB26970F9BB282A497D9291FD6BCE1003B6CD4E8973BE'),
            binary('D88D60D221D69BF4EBEAB26970F9BB282A497D9291FD6BCE1003B6CD4E8973BE'),
            binary('AAB4A5C7332B795EB1453D214C3D16EE9AFF7D47B8401F9698B378419297B0B7'),
            binary('0A638C93D3B6BD188E3042527BF79FEA17AB10E8CB3971375355C945854E1547'),
            binary('F974C096F792E5113AE6736EF67B9E465140D549F1B8502BCC320878D67B9DDF'),
            binary('C97F72666042D349C90A6A86627495DD9C729FBA5276ED5F78F18565200B9397'),
            binary('F287589A3DD011C61A5164BE9EAAF670582FA3F8BE87CA9E0459107840C58C77'),
            binary('B8BD70E7612F3CE825FA0B90327785E0758F72C44187ED540D0E2CA942804844'),
            binary('98DAB824C76463056B2032837750E9EEFC496F94FA6729734E9D0246CDB348D5'),
            binary('15735B7D9B954F0271E44125E5125F86AC618B562ECFADC63D62D33520B297B6'),
            binary('E8698E228A6C52EC26C9870A284C46CBE28A832AA87CC7BFB496C4BDDEFB0D77'),
            binary('2727CA2178C32DF6735D8D484D4A196B1958B60F3E5488F514945B3E8D1CC761'),
            binary('531CC0516BDDDE36D9F5A3AA29440AFE05A9F98560435EB81B3DEC13D76AE1C5'),
            binary('8055D22C4DEBEC5AB033FD61EA5DDB5841DADDD169C62441468823643E68BBE7'),
            binary('393B989B1C013EC6B97349674B78D3518FD854E1211C2B6645A45402900BDA16'),
            binary('B09E8F9BB78D289F7AA4BAA378ECE91CBB7C6F65350472B213ECD293CF3557FE'),
            binary('86FACE8553E5E5997C5DA77D57A948F64E47D68954F28D0CCDFC322F54693086'),
            binary('849CC13D270A9FCBB8FEA2DC1387E6D61B21DC9A487FD6F1BE6A172B306FA3EC'),
            binary('DBF6E614D4E256045514FDA951AAD6FF95984AB6C665D99A07D09E21094D122D'),
            binary('AE0BFCCA397BE7A365512E2CA7254BDA5BB694DDE3804AE859F630601D29E672'),
            binary('D43353CB529A6959DA7828814A57ECAEF0F105D2F9BE07DFD5632639104C91A0'),
            binary('4FF55D3BF70C6346FB7BA34BCC7AE30AB1C47900D794C1198B499E1277443A1B'),
            binary('B957E33C6C3CE94856E3996010992F27E0B904B861E53C111908C14A9CB7D14D'),
            binary('4233C43615AC2A0FC352742110C48EDCD14524B155C278934A294EAB3A5CD29E'),
            binary('7FC3C48FE395289A4886C090EE9B6A7E4F4DFCBE7F02CAC45FCA79FA01BDF784'),
            binary('EB0EAB9F9EFDD394FBE7E349EB90FA33EC5FAD1A75C812CCDED5F1C2947DE90B'),
            binary('6D0AE0A3FBB6CA78EB1E60C26EC4AA329C68604C03E417B4280519EB69162D3D'),
            binary('DB7871D322A84B5C698962316C1B50682C4F80757391AE07B6D56E67524646A0'),
            binary('07B64256F8E10CC39199652F512222617E43401F647300528C3FB8746C1423E8'),
            binary('86B5ED79602CA6E7AFA7263A350BFC290037B61FE608574116810E943E513E58'),
            binary('EB1309A88ACEF53C2E40740CD6B6436B02B240F6025D726E46FE8426333F0364'),
            binary('3610244733860D8182890751710231561109DE51A4F20DA829F388C324D872AE'),
            binary('65D81CB0B4A835D5905C47D073B1D0928A0A5B2ED3600A35A06D7C3D621171E2'),
            binary('16CEFB79F98E8D72499E1E182209A09EB6D22D063A9CE84C2F0F5F94FCACD8F6'),
            binary('EBB875BAB33218B831CA11E053D42ABCDEC26B31775D40E5F3E864B21A471CED'),
            binary('EBB875BAB33218B831CA11E053D42ABCDEC26B31775D40E5F3E864B21A471CED'),
            binary('F4BB7E292A863C93CA2FC0478C46949E61E8EE4BFCC8C19C66B0075466EEE171'),
            binary('4BF5BCC2605CFD643059F31247FF206F3E6704C24F6AC93D042D8C52413BF628'),
            binary('3FB9C141930735E71CD707D1603F164A4BEC40EF2182C9DB9565981933FDD2CD'),
            binary('56AE8B3C7489892658EBABA1F96B658E28714A1C2BA87AF240EA1A1FBAEAF960'),
            binary('3E10CA26C4CFF1195F17CE5D826FBF925C9B5BE8AC5478832CAA74C3DF71BE79'),
            binary('22AFF87249A30BC3BA28087E428758F957DB6468E07CF40633EBCA1BB68CE2FA'),
            binary('A2D30B9F1D774A718EBE9E88FCFA2F40DB2A04AA71B124FEA356867C3AA58D1B'),
            binary('83011DE652932780694AC6E418D8F7EA007FD90E2EC9F302D8D9C3FB0882BA7E'),
            binary('9879E875BF35944B4B1ACC955CC5F2FCEAC0EF7B805A942C8DF8DCEA14CF540A'),
            binary('9879E875BF35944B4B1ACC955CC5F2FCEAC0EF7B805A942C8DF8DCEA14CF540A'),
            binary('3335F02373C57F680C8486002DC76FF3B6B0072EE41965602DC8B40E4D571A62'),
            binary('57E60F396B6FD1EC90BA928891F1A4A8DC699F443585109F72A181493EA01A8E'),
            binary('204E79CC900F04EC329E3570C4E1BD41FA7E00A5245E9C2B8751AE8311F5D0D7')
          ],
          numStatements: 2,
          statementMerkleTree: [
            binary('8EA9EEA135F10FECFA55ED908593C6A3D24E672F1259E9DA776554BF67E722F7'),
            binary('A91F73FBD1169356F3D9D83D86DCB9646356947BADDB18A46169B2C351E105A7'),
            binary('8D3DEE3481284DEA5E0C0C6E6D1410F6E0B6B95439ACD3FACC2E5E2B854E5C5E')
          ]
        },
        block: {
          signature: binary('6E27DA6417A6ECF1A4AB3EB38D67BCEF57EE11B542B56E40AFCF0B9DB86EC52D92EDC7FDDEEB9F6CBA5E84A0753FEFF7516C3A988105385A8E1A2740793E2207'),
          signerPublicKey: binary('9BE93593C699867F1B4F624FD37BC7FB93499CDEC9929088F2FF1031293960FF'),
          version: 1,
          network: 152,
          type: 32835,
          height: long(1, 0),
          timestamp: long(0, 0),
          difficulty: long(276447232, 23283),
          feeMultiplier: 0,
          previousBlockHash: binary('0000000000000000000000000000000000000000000000000000000000000000'),
          transactionsHash: binary('204E79CC900F04EC329E3570C4E1BD41FA7E00A5245E9C2B8751AE8311F5D0D7'),
          receiptsHash: binary('8D3DEE3481284DEA5E0C0C6E6D1410F6E0B6B95439ACD3FACC2E5E2B854E5C5E'),
          stateHash: binary('F1EBFBCAA095EB008DEB57E79D886E4945CDE8063EB202E6B105FE4A9DF19DDA'),
          beneficiaryPublicKey: binary('9BE93593C699867F1B4F624FD37BC7FB93499CDEC9929088F2FF1031293960FF')
        }
      }
      expect(mongo.blocks(item)).to.eql({
        meta: {
          hash: '6E5DC4D3B6027AA2CF77CCD0222DE9E85536385829C72D77189F214C1AC81098',
          generationHash: '45870419226A7E51D61D94AD728231EDC6C9B3086EF9255A8421A4F26870456A',
          totalFee: '0',
          stateHashSubCacheMerkleRoots: [
            'E3E56D1079CEF577298C7C68EC42A11690F87A37D362B10C0B00FF0F61849A48',
            'E5228B463E386B75AA4AE191C7026324361644E2A6C69539CDCF18A1BD92BF3E',
            'D35D32632B024FF6B87E9D8ECC7E23C6079CEE7CFF0F45E70503749B84AD157F',
            '0000000000000000000000000000000000000000000000000000000000000000',
            '0000000000000000000000000000000000000000000000000000000000000000',
            '0000000000000000000000000000000000000000000000000000000000000000',
            '0000000000000000000000000000000000000000000000000000000000000000',
            '0000000000000000000000000000000000000000000000000000000000000000',
            '0000000000000000000000000000000000000000000000000000000000000000'
          ],
          numTransactions: 43,
          transactionMerkleTree: [
            '1F4B55D42C9C91805E73317319DDDA633667D5E44EB0F03678FF7F130555DF4B',
            'FC43D8029D448AC71F4C3751DADAE451CB8115285382F555B8D752FB80A5B2A6',
            '33BC10D8B818B90F12062C1022C4C553892C2F6187A8FC06F149B7FBE5D50B6A',
            'EEE6421C3397A937068F9C09B172221DC77B5C695D504B50291F328C97325DF1',
            'EAB74892D6FC2040FF20CDBD5E2497B27BB9B63AA47F619D7F18E2124C3A831A',
            '6442E6466B6B57B3D7038A02D45639727D8C89A8A5C3014ABD6FF153D34035D8',
            '89A988E320CFD0430A529AFAA2791FDAC7E2EC4923737E1038FBB4B58A0D4C38',
            '73C2DF0C98A2B6C49E4CD9B217E7513520CD7BF73065A536C088FB2A3ED8F97C',
            '2842E1A0A146729D0B479520425131607B7D520A7DF63B7EB9A266ADC7FDB6BC',
            '77EB1324C8685C50189635C9575F3E1F0D74080243C6544D08345635EC564716',
            'DFF9FAF6E65F331BD15CD627CD4808789B2DEE18E10B86B53E9B2FECA51A207D',
            '686A55F731854FD78620C8CB8FB3A61DA14701804A5778680459BE3DF2737B0D',
            '91D97513486EEA87D71030CCF6C6A91E3A421CB0C9D0B013746188494F44954D',
            '5603D1EC65D0EA203C51D63D0625217EC6DC06A85FE371785F5632426604BF7A',
            '0D94E5A76816644C8467B2B7E15D62578667AF6D6E4C96E7C08183586F58DD01',
            'DA1685AFDCA12C3E96534D7C3D001128C7A3A698C88EAB4E6A1E87A4998F9882',
            '9090E958C5C32F3C85DD28503741C4C5A96C4D996246B6C7999CB101BB51C058',
            '32591C7F2903AA7CDE631C127050924C572ED0954B580293BE9B7B044EC2326A',
            'F5DF45ED9DF55B0180B21E7C4B07AF01330EB561E7D6DCCE91EA624EB1668936',
            'AB58B3360754D68D6EA1D6615C2FF1D607E452D2873B1C8E8CDBDE5B1C6C6A5D',
            '646BB4C7C41877856C4594F7D92C5F3AAE6D83B776FCBFD7B026D7240DD97775',
            'CD38BA3C5C7809BEF002A868A6A79415433426526A70AD00BECB91B0E3FE2C40',
            '5E7E45CCD51589060EEE41EC4ED404458AB712A98F7AAA288C24643650CCC562',
            'C9F81C652FD472FBD2EE92F2B9FED0994AF3D99C58D465AFC3537694A486824A',
            '73D955551F9DE20EF420716502931017EB470D76AD078865CA4B82A3BBA8A964',
            '769AD1139E22C1C459CD7D65BB876D839DE9867581A84A07DA494E94F2CE9BEB',
            '4CC89908CB19C7EE9676030567D6DB2A1C8CB403439F454E0012FE2D07A44471',
            'C3E9783DD0BE8C85DD25085E258315F4C2074CD22127DDB66A8CA6A9539B0543',
            '7667AE4412DE6B08BDFF4F16CBB7C217E000E60543EBE62D07D1245B03C79FED',
            'FDAAE85BEAE1AC514FC9BE40797C09FD4416426F3409F50FEA56339D39874239',
            'AA520E6B1B7FFB7AC03983047FD3AD1E76B62935DB198FF209A5C00AB7E8B4A0',
            '672A1BBA8DF0FCF8335F4B64629F2883C911658BBA4EDBAFB4D38D49E83D00FB',
            '2FADB3DD2B4CDB5CEAA70222861791BA44C78ABFDB2E2338348F525EAF1819DA',
            '4DCCB5DE619D4EC547C19168E0CB3064B54F51B87763EFE6D63E15B3778357B1',
            '4014B2E29E7878C7DD7AF8B2D64DC2C0D52D706157945238C63EC4CD439E93C4',
            'C4D9FD40476A3427A647D77DB13F0D056177156AD947F05B942BF0024D8E5397',
            '317A29174CA361E7F837ACF586B0D81BB6067A85F30F61AECEF9901488FACC90',
            '8413E255AC2DAA75ACC70051E34CEB338B15A47F87013A4EF6D15F76A0EE9477',
            '873FD52211E126E29A9A7F1EF5FF31CB81EAE1300E39D409C0A30ECAC98688FD',
            '6134D37D00F3B7419DBDBF7DC2CAEFEEC9FA4EE938F22A0AB7B527BE1834F4A8',
            'C53FCCDF5B3DAA41D919CD727645B66AACB39A57A5DFB54DC1A8BF102007B1CE',
            'D0206F2F2C4C30777698378F0BD92491648A757454CEA4581F753AD9AB886D18',
            'D88D60D221D69BF4EBEAB26970F9BB282A497D9291FD6BCE1003B6CD4E8973BE',
            'D88D60D221D69BF4EBEAB26970F9BB282A497D9291FD6BCE1003B6CD4E8973BE',
            'AAB4A5C7332B795EB1453D214C3D16EE9AFF7D47B8401F9698B378419297B0B7',
            '0A638C93D3B6BD188E3042527BF79FEA17AB10E8CB3971375355C945854E1547',
            'F974C096F792E5113AE6736EF67B9E465140D549F1B8502BCC320878D67B9DDF',
            'C97F72666042D349C90A6A86627495DD9C729FBA5276ED5F78F18565200B9397',
            'F287589A3DD011C61A5164BE9EAAF670582FA3F8BE87CA9E0459107840C58C77',
            'B8BD70E7612F3CE825FA0B90327785E0758F72C44187ED540D0E2CA942804844',
            '98DAB824C76463056B2032837750E9EEFC496F94FA6729734E9D0246CDB348D5',
            '15735B7D9B954F0271E44125E5125F86AC618B562ECFADC63D62D33520B297B6',
            'E8698E228A6C52EC26C9870A284C46CBE28A832AA87CC7BFB496C4BDDEFB0D77',
            '2727CA2178C32DF6735D8D484D4A196B1958B60F3E5488F514945B3E8D1CC761',
            '531CC0516BDDDE36D9F5A3AA29440AFE05A9F98560435EB81B3DEC13D76AE1C5',
            '8055D22C4DEBEC5AB033FD61EA5DDB5841DADDD169C62441468823643E68BBE7',
            '393B989B1C013EC6B97349674B78D3518FD854E1211C2B6645A45402900BDA16',
            'B09E8F9BB78D289F7AA4BAA378ECE91CBB7C6F65350472B213ECD293CF3557FE',
            '86FACE8553E5E5997C5DA77D57A948F64E47D68954F28D0CCDFC322F54693086',
            '849CC13D270A9FCBB8FEA2DC1387E6D61B21DC9A487FD6F1BE6A172B306FA3EC',
            'DBF6E614D4E256045514FDA951AAD6FF95984AB6C665D99A07D09E21094D122D',
            'AE0BFCCA397BE7A365512E2CA7254BDA5BB694DDE3804AE859F630601D29E672',
            'D43353CB529A6959DA7828814A57ECAEF0F105D2F9BE07DFD5632639104C91A0',
            '4FF55D3BF70C6346FB7BA34BCC7AE30AB1C47900D794C1198B499E1277443A1B',
            'B957E33C6C3CE94856E3996010992F27E0B904B861E53C111908C14A9CB7D14D',
            '4233C43615AC2A0FC352742110C48EDCD14524B155C278934A294EAB3A5CD29E',
            '7FC3C48FE395289A4886C090EE9B6A7E4F4DFCBE7F02CAC45FCA79FA01BDF784',
            'EB0EAB9F9EFDD394FBE7E349EB90FA33EC5FAD1A75C812CCDED5F1C2947DE90B',
            '6D0AE0A3FBB6CA78EB1E60C26EC4AA329C68604C03E417B4280519EB69162D3D',
            'DB7871D322A84B5C698962316C1B50682C4F80757391AE07B6D56E67524646A0',
            '07B64256F8E10CC39199652F512222617E43401F647300528C3FB8746C1423E8',
            '86B5ED79602CA6E7AFA7263A350BFC290037B61FE608574116810E943E513E58',
            'EB1309A88ACEF53C2E40740CD6B6436B02B240F6025D726E46FE8426333F0364',
            '3610244733860D8182890751710231561109DE51A4F20DA829F388C324D872AE',
            '65D81CB0B4A835D5905C47D073B1D0928A0A5B2ED3600A35A06D7C3D621171E2',
            '16CEFB79F98E8D72499E1E182209A09EB6D22D063A9CE84C2F0F5F94FCACD8F6',
            'EBB875BAB33218B831CA11E053D42ABCDEC26B31775D40E5F3E864B21A471CED',
            'EBB875BAB33218B831CA11E053D42ABCDEC26B31775D40E5F3E864B21A471CED',
            'F4BB7E292A863C93CA2FC0478C46949E61E8EE4BFCC8C19C66B0075466EEE171',
            '4BF5BCC2605CFD643059F31247FF206F3E6704C24F6AC93D042D8C52413BF628',
            '3FB9C141930735E71CD707D1603F164A4BEC40EF2182C9DB9565981933FDD2CD',
            '56AE8B3C7489892658EBABA1F96B658E28714A1C2BA87AF240EA1A1FBAEAF960',
            '3E10CA26C4CFF1195F17CE5D826FBF925C9B5BE8AC5478832CAA74C3DF71BE79',
            '22AFF87249A30BC3BA28087E428758F957DB6468E07CF40633EBCA1BB68CE2FA',
            'A2D30B9F1D774A718EBE9E88FCFA2F40DB2A04AA71B124FEA356867C3AA58D1B',
            '83011DE652932780694AC6E418D8F7EA007FD90E2EC9F302D8D9C3FB0882BA7E',
            '9879E875BF35944B4B1ACC955CC5F2FCEAC0EF7B805A942C8DF8DCEA14CF540A',
            '9879E875BF35944B4B1ACC955CC5F2FCEAC0EF7B805A942C8DF8DCEA14CF540A',
            '3335F02373C57F680C8486002DC76FF3B6B0072EE41965602DC8B40E4D571A62',
            '57E60F396B6FD1EC90BA928891F1A4A8DC699F443585109F72A181493EA01A8E',
            '204E79CC900F04EC329E3570C4E1BD41FA7E00A5245E9C2B8751AE8311F5D0D7'
          ],
          numStatements: 2,
          statementMerkleTree: [
            '8EA9EEA135F10FECFA55ED908593C6A3D24E672F1259E9DA776554BF67E722F7',
            'A91F73FBD1169356F3D9D83D86DCB9646356947BADDB18A46169B2C351E105A7',
            '8D3DEE3481284DEA5E0C0C6E6D1410F6E0B6B95439ACD3FACC2E5E2B854E5C5E'
          ]
        },
        block: {
          signature: '6E27DA6417A6ECF1A4AB3EB38D67BCEF57EE11B542B56E40AFCF0B9DB86EC52D92EDC7FDDEEB9F6CBA5E84A0753FEFF7516C3A988105385A8E1A2740793E2207',
          signerPublicKey: '9BE93593C699867F1B4F624FD37BC7FB93499CDEC9929088F2FF1031293960FF',
          version: 1,
          network: 152,
          type: 32835,
          height: 1,
          timestamp: '0',
          difficulty: '100000000000000',
          feeMultiplier: 0,
          previousBlockHash: '0000000000000000000000000000000000000000000000000000000000000000',
          transactionsHash: '204E79CC900F04EC329E3570C4E1BD41FA7E00A5245E9C2B8751AE8311F5D0D7',
          receiptsHash: '8D3DEE3481284DEA5E0C0C6E6D1410F6E0B6B95439ACD3FACC2E5E2B854E5C5E',
          stateHash: 'F1EBFBCAA095EB008DEB57E79D886E4945CDE8063EB202E6B105FE4A9DF19DDA',
          beneficiaryPublicKey: '9BE93593C699867F1B4F624FD37BC7FB93499CDEC9929088F2FF1031293960FF'
        }
      })
    })
  })

  describe('chainStatistic', () => {
    it('should parse a valid chain statistic', () => {
      let item = {
        current: {
          height: long(57549, 0),
          scoreLow: long(3899910630, 134312366),
          scoreHigh: long(0, 0)
        }
      }
      expect(mongo.chainStatistic(item)).to.eql({
        current: {
          height: '57549',
          scoreLow: '576867223318292966',
          scoreHigh: '0'
        }
      })
    })
  })

  describe('hashLocks', () => {
    it('should parse a valid hash lock', () => {
      let item = {
        lock: {
          senderPublicKey: binary('9BE93593C699867F1B4F624FD37BC7FB93499CDEC9929088F2FF1031293960FF'),
          senderAddress: binary('98875D60F721C3B15319826467D3F85F8FC9D7FA781665E4EA'),
          mosaicId: long(92423592, 1370066984),
          amount: long(100, 0),
          endHeight: long(3000, 0),
          status: 0,
          hash: binary('0000000000000000000000000000000000000000000000000000000000000000')
        }
      }
      expect(mongo.hashLocks(item)).to.eql({
        lock: {
          sender: {
            publicKey: '9BE93593C699867F1B4F624FD37BC7FB93499CDEC9929088F2FF1031293960FF',
            address: 'TCDV2YHXEHB3CUYZQJSGPU7YL6H4TV72PALGLZHK'
          },
          mosaicId: '51A99028058245A8',
          amount: '100',
          endHeight: '3000',
          status: 0,
          hash: '0000000000000000000000000000000000000000000000000000000000000000'
        }
      })
    })
  })

  describe('metadata', () => {
    it('should parse valid metadata', () => {
      let item = {
        metadataEntry: {
          compositeHash: binary('C137A1CE8CD711F35FEB3861764EA0C7659CCE6C0CF972CBF74E43ED64436D62'),
          senderPublicKey: binary('3C24259DD34FFB8777BE57B5092CFCF761E2AAA780B58C85A3242F8AD3FBFDAC'),
          targetPublicKey: binary('3C24259DD34FFB8777BE57B5092CFCF761E2AAA780B58C85A3242F8AD3FBFDAC'),
          scopedMetadataKey: long(3621910282, 3608761926),
          targetId: long(0, 0),
          metadataType: 0,
          valueSize: 23,
          value: binary('7B7465737465724163636F756E743A416E74686F6E797D')
        }
      }
      expect(mongo.metadata(item)).to.eql({
        metadataEntry: {
          compositeHash: 'C137A1CE8CD711F35FEB3861764EA0C7659CCE6C0CF972CBF74E43ED64436D62',
          senderPublicKey: '3C24259DD34FFB8777BE57B5092CFCF761E2AAA780B58C85A3242F8AD3FBFDAC',
          targetPublicKey: '3C24259DD34FFB8777BE57B5092CFCF761E2AAA780B58C85A3242F8AD3FBFDAC',
          scopedMetadataKey: '15499514454841882378',
          targetId: '0000000000000000',
          metadataType: 0,
          valueSize: 23,
          value: '7B7465737465724163636F756E743A416E74686F6E797D'
        }
      })
    })
  })

  describe('mosaicResolutionStatements', () => {
    it('should parse a valid mosaic resolution statement', () => {
      let item = {
        statement: {
          height: long(1, 0),
          unresolved: long(1106554862, 3880491450),
          resolutionEntries: [
            {
              source: {
                primaryId: 5,
                secondaryId: 0
              },
              resolved: long(92423592, 1370066984)
            }
          ]
        }
      }
      expect(mongo.mosaicResolutionStatements(item)).to.eql({
        statement: {
          height: '1',
          unresolved: 'E74B99BA41F4AFEE',
          resolutionEntries: [
            {
              source: {
                primaryId: 5,
                secondaryId: 0
              },
              resolved: '51A99028058245A8'
            }
          ]
        }
      })
    })
  })

  describe('mosaicRestrictions', () => {
    it('should parse a valid mosaic restriction', () => {
      // Global restriction
      let item = {
        mosaicRestrictionEntry: {
          compositeHash: binary('D801EF269B147C8E1677F9DBFF549D82C9597B29C7A1CB2E623F76B29F08955D'),
          entryType: 1,
          mosaicId: long(3264161012, 1054803538),
          restrictions: [
            {
              key: long(2807928890, 2988827215),
              restriction: {
                referenceMosaicId: long(0, 0),
                restrictionValue: long(1, 0),
                restrictionType: 1
              }
            },
            {
              key: long(1408183365, 4250713378),
              restriction: {
                referenceMosaicId: long(0, 0),
                restrictionValue: long(1, 0),
                restrictionType: 1
              }
            }
          ]
        }
      }
      expect(mongo.mosaicRestrictions(item)).to.eql({
        mosaicRestrictionEntry: {
          compositeHash: 'D801EF269B147C8E1677F9DBFF549D82C9597B29C7A1CB2E623F76B29F08955D',
          entryType: 1,
          mosaicId: '3EDF0652C28F24F4',
          restrictions: [
            {
              key: 'B225E24FA75D983A',
              restriction: {
                referenceMosaicId: '0000000000000000',
                restrictionValue: '1',
                restrictionType: 1
              }
            },
            {
              key: 'FD5CBD2253EF2C45',
              restriction: {
                referenceMosaicId: '0000000000000000',
                restrictionValue: '1',
                restrictionType: 1
              }
            }
          ]
        }
      })

      // Address restriction
      item = {
        mosaicRestrictionEntry: {
          compositeHash: binary('4BB9C6DCF56209A1E52E2F646B3994FD7F266784E407C7891DC34BE5BEEE4437'),
          entryType: 0,
          mosaicId: long(3264161012, 1054803538),
          targetAddress: binary('98E0A3C020A97113893126969D78C7F5180B904C4A07DF478A'),
          restrictions: [
            {
              key: long(2807928890, 2988827215),
              value: long(2, 0)
            }
          ]
        }
      }
      expect(mongo.mosaicRestrictions(item)).to.eql({
        mosaicRestrictionEntry: {
          compositeHash: '4BB9C6DCF56209A1E52E2F646B3994FD7F266784E407C7891DC34BE5BEEE4437',
          entryType: 0,
          mosaicId: '3EDF0652C28F24F4',
          targetAddress: 'TDQKHQBAVFYRHCJRE2LJ26GH6UMAXECMJID56R4K',
          restrictions: [
            {
              key: 'B225E24FA75D983A',
              value: '0000000000000002'
            }
          ]
        }
      })
    })
  })

  describe('mosaics', () => {
    it('should parse a valid mosaic', () => {
      let item = {
        mosaic: {
          id: long(92423592, 1370066984),
          supply: long(3228438221, 1825527),
          startHeight: long(1, 0),
          ownerPublicKey: binary('9BE93593C699867F1B4F624FD37BC7FB93499CDEC9929088F2FF1031293960FF'),
          ownerAddress: binary('98875D60F721C3B15319826467D3F85F8FC9D7FA781665E4EA'),
          revision: 1,
          flags: 2,
          divisibility: 6,
          duration: long(0, 0)
        }
      }
      expect(mongo.mosaics(item)).to.eql({
        mosaic: {
          id: '51A99028058245A8',
          supply: '7840581991403213',
          startHeight: '1',
          owner: {
            publicKey: '9BE93593C699867F1B4F624FD37BC7FB93499CDEC9929088F2FF1031293960FF',
            address: 'TCDV2YHXEHB3CUYZQJSGPU7YL6H4TV72PALGLZHK'
          },
          revision: 1,
          flags: 2,
          divisibility: 6,
          duration: '0'
        }
      })
    })
  })

  describe('multisigs', () => {
    it('should parse a valid multisig', () => {
      let item = {
        multisig: {
          accountPublicKey: binary('545651E3CEEFCC47A2763B059A95C99C3BE236258811382933340FC324ECEAA9'),
          accountAddress: binary('98C46B1CDB2DA8865101C2E485066FD4A13A0E671D4E8DF061'),
          minApproval: 0,
          minRemoval: 0,
          cosignatoryPublicKeys: [],
          multisigPublicKeys: [
            binary('AC332A2998873EDF5DD7B7F9B256B39C8E069E492483FF9D7F8B3580228A2F59')
          ]
        }
      }
      expect(mongo.multisigs(item)).to.eql({
        multisig: {
          account: {
            publicKey: '545651E3CEEFCC47A2763B059A95C99C3BE236258811382933340FC324ECEAA9',
            address: 'TDCGWHG3FWUIMUIBYLSIKBTP2SQTUDTHDVHI34DB'
          },
          minApproval: 0,
          minRemoval: 0,
          cosignatoryPublicKeys: [],
          multisigPublicKeys: [
            'AC332A2998873EDF5DD7B7F9B256B39C8E069E492483FF9D7F8B3580228A2F59'
          ]
        }
      })
    })
  })

  describe('namespaces', () => {
    it('should parse a valid namespace', () => {
      let item = {
        meta: {
          active: true,
          index: 0
        },
        namespace: {
          registrationType: 0,
          depth: 1,
          level0: long(2517996822, 2841583498),
          alias: {
            type: 0
          },
          parentId: long(0, 0),
          ownerPublicKey: binary('9BE93593C699867F1B4F624FD37BC7FB93499CDEC9929088F2FF1031293960FF'),
          ownerAddress: binary('98875D60F721C3B15319826467D3F85F8FC9D7FA781665E4EA'),
          startHeight: long(1, 0),
          endHeight: long(4294967295, 4294967295)
        }
      }
      expect(mongo.namespaces(item)).to.eql({
        meta: {
          active: true,
          index: 0
        },
        namespace: {
          registrationType: 0,
          depth: 1,
          levels: [
            'A95F1F8A96159516'
          ],
          alias: {
            type: 0
          },
          parentId: '0000000000000000',
          'owner': {
            publicKey: '9BE93593C699867F1B4F624FD37BC7FB93499CDEC9929088F2FF1031293960FF',
            address: 'TCDV2YHXEHB3CUYZQJSGPU7YL6H4TV72PALGLZHK'
          },
          startHeight: '1',
          endHeight: '18446744073709551615'
        }
      })
    })
  })

  // TODO(ahuszagh) Implement...
  describe('partialTransactions', () => {})

  describe('secretLocks', () => {
    it('should parse a valid secret lock', () => {
      let item = {
        lock: {
          senderPublicKey: binary('9BE93593C699867F1B4F624FD37BC7FB93499CDEC9929088F2FF1031293960FF'),
          senderAddress: binary('98875D60F721C3B15319826467D3F85F8FC9D7FA781665E4EA'),
          mosaicId: long(92423592, 1370066984),
          amount: long(100, 0),
          endHeight: long(3000, 0),
          status: 0,
          hashAlgorithm: 1,
          secret: binary('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF'),
          recipientAddress: binary('992BE6B9E9B101B8BB00000000000000000000000000000000'),
          compositeHash: binary('0000000000000000000000000000000000000000000000000000000000000000')
        }
      }
      expect(mongo.secretLocks(item)).to.eql({
        lock: {
          sender: {
            publicKey: '9BE93593C699867F1B4F624FD37BC7FB93499CDEC9929088F2FF1031293960FF',
            address: 'TCDV2YHXEHB3CUYZQJSGPU7YL6H4TV72PALGLZHK'
          },
          mosaicId: '51A99028058245A8',
          amount: '100',
          endHeight: '3000',
          status: 0,
          hashAlgorithm: 1,
          secret: 'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
          recipientAddress: 'TEV6NOPJWEA3ROYAAAAAAAAAAAAAAAAAAAAAAAAA',
          compositeHash: '0000000000000000000000000000000000000000000000000000000000000000'
        }
      })
    })
  })

  describe('transactionStatements', () => {
    it('should parse a valid transaction statement', () => {
      let item = {
        statement: {
          height: long(1, 0),
          source: {
            primaryId: 0,
            secondaryId: 0
          },
          receipts: [
            {
              version: 1,
              type: 8515,
              targetPublicKey: binary('9BE93593C699867F1B4F624FD37BC7FB93499CDEC9929088F2FF1031293960FF'),
              mosaicId: long(92423592, 1370066984),
              amount: long(0, 0)
            }
          ]
        }
      }
      expect(mongo.transactionStatements(item)).to.eql({
        statement: {
          height: '1',
          source: {
            primaryId: 0,
            secondaryId: 0
          },
          receipts: [
            {
              version: 1,
              type: 8515,
              targetPublicKey: '9BE93593C699867F1B4F624FD37BC7FB93499CDEC9929088F2FF1031293960FF',
              mosaicId: '51A99028058245A8',
              amount: '0'
            }
          ]
        }
      })
    })
  })

  describe('transactionStatuses', () => {
    it('should parse a valid transaction status', () => {
      let item = {
        status: {
          hash: binary('0000000000000000000000000000000000000000000000000000000000000000'),
          code: 0,
          deadline: long(1, 0)
        }
      }
      expect(mongo.transactionStatuses(item)).to.eql({
          status: {
          hash: '0000000000000000000000000000000000000000000000000000000000000000',
          code: 0,
          deadline: '1'
        }
      })
    })
  })

  describe('transactions', () => {
    it('should parse a transfer transaction', () => {
      let item = {
        _id: object('5E4C2D9E26EC0922222ECEED'),
        meta: {
          height: long(1, 0),
          hash: binary('77EB1324C8685C50189635C9575F3E1F0D74080243C6544D08345635EC564716'),
          merkleComponentHash: binary('77EB1324C8685C50189635C9575F3E1F0D74080243C6544D08345635EC564716'),
          index: 9,
          addresses: [
            binary('98AE5B94F7911CB302FE78E9CFDE21EF5A47174628055AC3AA'),
            binary('98875D60F721C3B15319826467D3F85F8FC9D7FA781665E4EA')
          ]
        },
        transaction: {
          signature: binary('1635815646B8A778F810045B09A833103A8D620F6DE6B6DD1870ABB14589D78CD7C1487B0FF859C4B957D05DE4F792D86FDA13E673642FE83D24E96A40958E0A'),
          signerPublicKey: binary('9BE93593C699867F1B4F624FD37BC7FB93499CDEC9929088F2FF1031293960FF'),
          version: 1,
          network: 0x98,
          type: 0x4154,
          maxFee: long(0, 0),
          deadline: long(1, 0),
          recipientAddress: binary('98AE5B94F7911CB302FE78E9CFDE21EF5A47174628055AC3AA'),
          mosaics: [
            {
              id: long(1106554862, 3880491450),
              amount: long(833619904, 91176)
            }
          ]
        }
      }
      expect(mongo.transactions(item)).to.eql({
        meta: {
          height: '1',
          hash: '77EB1324C8685C50189635C9575F3E1F0D74080243C6544D08345635EC564716',
          id: '5E4C2D9E26EC0922222ECEED',
          merkleComponentHash: '77EB1324C8685C50189635C9575F3E1F0D74080243C6544D08345635EC564716',
          index: 9,
          addresses: [
            'TCXFXFHXSEOLGAX6PDU47XRB55NEOF2GFACVVQ5K',
            'TCDV2YHXEHB3CUYZQJSGPU7YL6H4TV72PALGLZHK'
          ]
        },
        transaction: {
          signature: '1635815646B8A778F810045B09A833103A8D620F6DE6B6DD1870ABB14589D78CD7C1487B0FF859C4B957D05DE4F792D86FDA13E673642FE83D24E96A40958E0A',
          signerPublicKey: '9BE93593C699867F1B4F624FD37BC7FB93499CDEC9929088F2FF1031293960FF',
          version: 1,
          network: 0x98,
          type: 0x4154,
          maxFee: '0',
          deadline: '1',
          recipientAddress: 'TCXFXFHXSEOLGAX6PDU47XRB55NEOF2GFACVVQ5K',
          mosaics: [
            {
              mosaicId: 'E74B99BA41F4AFEE',
              amount: '391598771800000'
            }
          ]
        }
      })
    })

    it('should parse a register namespace transaction', () => {
      let item = {
        _id: object('5E4C2D9E26EC0922222ECEE4'),
        meta: {
          height: long(1, 0),
          hash: binary('1F4B55D42C9C91805E73317319DDDA633667D5E44EB0F03678FF7F130555DF4B'),
          merkleComponentHash: binary('1F4B55D42C9C91805E73317319DDDA633667D5E44EB0F03678FF7F130555DF4B'),
          index: 0,
          addresses: [
            binary('987DD84AE6AF4B49C5F5648550F239F952BA6F4B3B9CFE3068'),
            binary('98875D60F721C3B15319826467D3F85F8FC9D7FA781665E4EA')
          ]
        },
        transaction: {
          signature: binary('2879DE1383EF60810E30B4F563B7CCA420B195FF2D202097560F1ACCE6B70CE5BE05037CE82D382BD3DE51FF0586E40172EEBD828412A26847CB367439495B09'),
          signerPublicKey: binary('9BE93593C699867F1B4F624FD37BC7FB93499CDEC9929088F2FF1031293960FF'),
          version: 1,
          network: 0x98,
          type: 0x414E,
          maxFee: long(0, 0),
          deadline: long(1, 0),
          registrationType: 0,
          duration: long(0, 0),
          id: long(2517996822, 2841583498),
          name: binary('73796D626F6C')
        }
      }
      expect(mongo.transactions(item)).to.eql({
        meta: {
          height: '1',
          hash: '1F4B55D42C9C91805E73317319DDDA633667D5E44EB0F03678FF7F130555DF4B',
          id: '5E4C2D9E26EC0922222ECEE4',
          merkleComponentHash: '1F4B55D42C9C91805E73317319DDDA633667D5E44EB0F03678FF7F130555DF4B',
          index: 0,
          addresses: [
            'TB65QSXGV5FUTRPVMSCVB4RZ7FJLU32LHOOP4MDI',
            'TCDV2YHXEHB3CUYZQJSGPU7YL6H4TV72PALGLZHK'
          ]
        },
        transaction: {
          signature: '2879DE1383EF60810E30B4F563B7CCA420B195FF2D202097560F1ACCE6B70CE5BE05037CE82D382BD3DE51FF0586E40172EEBD828412A26847CB367439495B09',
          signerPublicKey: '9BE93593C699867F1B4F624FD37BC7FB93499CDEC9929088F2FF1031293960FF',
          version: 1,
          network: 0x98,
          type: 0x414E,
          maxFee: '0',
          deadline: '1',
          duration: '0',
          namespaceId: 'A95F1F8A96159516',
          namespaceType: 0,
          name: 'symbol'
        }
      })
    })

    it('should parse an address alias transaction', () => {
      let item = {
        _id: object('5E4C2DFC26EC0922222F2EF5'),
        meta: {
          height: long(7847, 0),
          hash: binary('4AF654C9ED9B05383B9D8ED53725031129673C129CAB3289DFBF5C37E412746D'),
          merkleComponentHash: binary('4AF654C9ED9B05383B9D8ED53725031129673C129CAB3289DFBF5C37E412746D'),
          index: 0,
          addresses: [
            binary('98E0DA79944B614A6CEF698F30B3BA8F36785AB21E9408F08A')
          ]
        },
        transaction: {
          signature: binary('2347B462B2B05800AF3DF2E42983E6121100ABB76E682890606E20D97743491071A7349874DBF6EA36039312456056DE1836038534C72B90C8A6326FC6C71303'),
          signerPublicKey: binary('AC332A2998873EDF5DD7B7F9B256B39C8E069E492483FF9D7F8B3580228A2F59'),
          version: 1,
          network: 0x98,
          type: 0x424E,
          maxFee: long(2000000, 0),
          deadline: long(3101548547, 1),
          namespaceId: long(4290400015, 2409642742),
          aliasAction: 1,
          address: binary('98E0DA79944B614A6CEF698F30B3BA8F36785AB21E9408F08A')
        }
      }
      expect(mongo.transactions(item)).to.eql({
        meta: {
          height: '7847',
          hash: '4AF654C9ED9B05383B9D8ED53725031129673C129CAB3289DFBF5C37E412746D',
          id: '5E4C2DFC26EC0922222F2EF5',
          merkleComponentHash: '4AF654C9ED9B05383B9D8ED53725031129673C129CAB3289DFBF5C37E412746D',
          index: 0,
          addresses: [
            'TDQNU6MUJNQUU3HPNGHTBM52R43HQWVSD2KAR4EK'
          ]
        },
        transaction: {
          signature: '2347B462B2B05800AF3DF2E42983E6121100ABB76E682890606E20D97743491071A7349874DBF6EA36039312456056DE1836038534C72B90C8A6326FC6C71303',
          signerPublicKey: 'AC332A2998873EDF5DD7B7F9B256B39C8E069E492483FF9D7F8B3580228A2F59',
          version: 1,
          network: 0x98,
          type: 0x424E,
          maxFee: '2000000',
          deadline: '7396515843',
          namespaceId: '8FA03AF6FFBA4F0F',
          aliasAction: 1,
          address: 'TDQNU6MUJNQUU3HPNGHTBM52R43HQWVSD2KAR4EK'
        }
      })
    })

    it('should parse a mosaic alias transaction', () => {
      let item = {
        _id: object('5E4C2D9E26EC0922222ECEEA'),
        meta: {
          height: long(1, 0),
          hash: binary('EEE6421C3397A937068F9C09B172221DC77B5C695D504B50291F328C97325DF1'),
          merkleComponentHash: binary('EEE6421C3397A937068F9C09B172221DC77B5C695D504B50291F328C97325DF1'),
          index: 3,
          addresses: [
            binary('98875D60F721C3B15319826467D3F85F8FC9D7FA781665E4EA')
          ]
        },
        transaction: {
          signature: binary('5C59C66C448230B671EA61F1664128F86654FB49A95331245F6708933EE34ACDD74D38FA938157C679AA4923BCF29B298F203867F049C75337B951A72F7EC904'),
          signerPublicKey: binary('9BE93593C699867F1B4F624FD37BC7FB93499CDEC9929088F2FF1031293960FF'),
          version: 1,
          network: 0x98,
          type: 0x434E,
          maxFee: long(0, 0),
          deadline: long(1, 0),
          namespaceId: long(1106554862, 3880491450),
          aliasAction: 1,
          mosaicId: long(92423592, 1370066984)
        }
      }
      expect(mongo.transactions(item)).to.eql({
        meta: {
          height: '1',
          hash: 'EEE6421C3397A937068F9C09B172221DC77B5C695D504B50291F328C97325DF1',
          id: '5E4C2D9E26EC0922222ECEEA',
          merkleComponentHash: 'EEE6421C3397A937068F9C09B172221DC77B5C695D504B50291F328C97325DF1',
          index: 3,
          addresses: [
            'TCDV2YHXEHB3CUYZQJSGPU7YL6H4TV72PALGLZHK'
          ]
        },
        transaction: {
          signature: '5C59C66C448230B671EA61F1664128F86654FB49A95331245F6708933EE34ACDD74D38FA938157C679AA4923BCF29B298F203867F049C75337B951A72F7EC904',
          signerPublicKey: '9BE93593C699867F1B4F624FD37BC7FB93499CDEC9929088F2FF1031293960FF',
          version: 1,
          network: 0x98,
          type: 0x434E,
          maxFee: '0',
          deadline: '1',
          namespaceId: 'E74B99BA41F4AFEE',
          aliasAction: 1,
          mosaicId: '51A99028058245A8'
        }
      })
    })

    it('should parse a mosaic definition transaction', () => {
      let item = {
        _id: object('5E4C2D9E26EC0922222ECEE7'),
        meta: {
          height: long(1, 0),
          hash: binary('33BC10D8B818B90F12062C1022C4C553892C2F6187A8FC06F149B7FBE5D50B6A'),
          merkleComponentHash: binary('33BC10D8B818B90F12062C1022C4C553892C2F6187A8FC06F149B7FBE5D50B6A'),
          index: 2,
          addresses: [
            binary('987DD84AE6AF4B49C5F5648550F239F952BA6F4B3B9CFE3068'),
            binary('98875D60F721C3B15319826467D3F85F8FC9D7FA781665E4EA')
          ]
        },
        transaction: {
          signature: binary('ED9FBA01087560C834A006AA48EE8351CA30B9B03DDBCC605EE11AFAB7B1395EF43452BEF931F63C7B0ED42FC42436ED64A463DEFADCFA6060602980CD17E207'),
          signerPublicKey: binary('9BE93593C699867F1B4F624FD37BC7FB93499CDEC9929088F2FF1031293960FF'),
          version: 1,
          network: 0x98,
          type: 0x414D,
          maxFee: long(0, 0),
          deadline: long(1, 0),
          nonce: 0,
          id: long(92423592, 1370066984),
          flags: 2,
          divisibility: 6,
          duration: long(0, 0)
        }
      }
      expect(mongo.transactions(item)).to.eql({
        meta: {
          height: '1',
          hash: '33BC10D8B818B90F12062C1022C4C553892C2F6187A8FC06F149B7FBE5D50B6A',
          id: '5E4C2D9E26EC0922222ECEE7',
          merkleComponentHash: '33BC10D8B818B90F12062C1022C4C553892C2F6187A8FC06F149B7FBE5D50B6A',
          index: 2,
          addresses: [
            'TB65QSXGV5FUTRPVMSCVB4RZ7FJLU32LHOOP4MDI',
            'TCDV2YHXEHB3CUYZQJSGPU7YL6H4TV72PALGLZHK'
          ]
        },
        transaction: {
          signature: 'ED9FBA01087560C834A006AA48EE8351CA30B9B03DDBCC605EE11AFAB7B1395EF43452BEF931F63C7B0ED42FC42436ED64A463DEFADCFA6060602980CD17E207',
          signerPublicKey: '9BE93593C699867F1B4F624FD37BC7FB93499CDEC9929088F2FF1031293960FF',
          version: 1,
          network: 0x98,
          type: 0x414D,
          maxFee: '0',
          deadline: '1',
          nonce: 0,
          mosaicId: '51A99028058245A8',
          flags: 2,
          divisibility: 6,
          duration: '0'
        }
      })
    })

    it('should parse a mosaic supply change transaction', () => {
      let item = {
        _id: object('5E4C2D9E26EC0922222ECEEB'),
        meta: {
          height: long(1, 0),
          hash: binary('EAB74892D6FC2040FF20CDBD5E2497B27BB9B63AA47F619D7F18E2124C3A831A'),
          merkleComponentHash: binary('EAB74892D6FC2040FF20CDBD5E2497B27BB9B63AA47F619D7F18E2124C3A831A'),
          index: 4,
          addresses: [
            binary('98875D60F721C3B15319826467D3F85F8FC9D7FA781665E4EA')
          ]
        },
        transaction: {
          signature: binary('3D7680C645BDC54DCD7A51C94E5CAF945ED8D46642D85BDA657E1F8B83A4FAD38C17A3FA352325547E029716A8339C9E4C548B83B483F507D3054F1B92688805'),
          signerPublicKey: binary('9BE93593C699867F1B4F624FD37BC7FB93499CDEC9929088F2FF1031293960FF'),
          version: 1,
          network: 0x98,
          type: 0x424D,
          maxFee: long(0, 0),
          deadline: long(1, 0),
          mosaicId: long(1106554862, 3880491450),
          action: 1,
          delta: long(3787496192, 1823523)
        }
      }
      expect(mongo.transactions(item)).to.eql({
        meta: {
          height: '1',
          hash: 'EAB74892D6FC2040FF20CDBD5E2497B27BB9B63AA47F619D7F18E2124C3A831A',
          id: '5E4C2D9E26EC0922222ECEEB',
          merkleComponentHash: 'EAB74892D6FC2040FF20CDBD5E2497B27BB9B63AA47F619D7F18E2124C3A831A',
          index: 4,
          addresses: [
            'TCDV2YHXEHB3CUYZQJSGPU7YL6H4TV72PALGLZHK'
          ]
        },
        transaction: {
          signature: '3D7680C645BDC54DCD7A51C94E5CAF945ED8D46642D85BDA657E1F8B83A4FAD38C17A3FA352325547E029716A8339C9E4C548B83B483F507D3054F1B92688805',
          signerPublicKey: '9BE93593C699867F1B4F624FD37BC7FB93499CDEC9929088F2FF1031293960FF',
          version: 1,
          network: 0x98,
          type: 0x424D,
          maxFee: '0',
          deadline: '1',
          mosaicId: 'E74B99BA41F4AFEE',
          action: 1,
          delta: '7831975436000000'
        }
      })
    })

    it('should parse a modify multisig transaction', () => {
      let item = {
        _id: object('5E4C2E0926EC0922222F3233'),
        meta: {
          height: long(8181, 0),
          aggregateHash: binary('A91F6F092E96E0FE9BB2927A2EC8EFAFB4DEFBBC6F6CADB581AF168CD445F6B2'),
          aggregateId: object('5E4C2E0926EC0922222F3232'),
          index: 0
        },
        transaction: {
          signerPublicKey: binary('AC332A2998873EDF5DD7B7F9B256B39C8E069E492483FF9D7F8B3580228A2F59'),
          version: 1,
          network: 0x98,
          type: 0x4155,
          minRemovalDelta: 3,
          minApprovalDelta: 2,
          publicKeyAdditions: [
            binary('545651E3CEEFCC47A2763B059A95C99C3BE236258811382933340FC324ECEAA9'),
            binary('DA997216C50D4425FB216285FC9110DE1E162E69B36A34DA8FCD8F9ED8980311'),
            binary('110B8B7625A2E2573E5756D33EBCB882EDF7487344AA1CCEFC52E2FCE360AA06'),
            binary('9AE55E3E5BFCDBF39E1DFE7E154C0837FA35CE0B683D85AF8C9ED40A2C07DEF8'),
            binary('598203EDEB7BE359AFEC802E9EDE147230CCA026852EF804BD8864A38EBEAE4B')
          ],
          publicKeyDeletions: []
        }
      }
      expect(mongo.transactions(item)).to.eql({
        meta: {
          height: '8181',
          aggregateHash: 'A91F6F092E96E0FE9BB2927A2EC8EFAFB4DEFBBC6F6CADB581AF168CD445F6B2',
          id: '5E4C2E0926EC0922222F3233',
          aggregateId: '5E4C2E0926EC0922222F3232',
          index: 0
        },
        transaction: {
          signerPublicKey: 'AC332A2998873EDF5DD7B7F9B256B39C8E069E492483FF9D7F8B3580228A2F59',
          version: 1,
          network: 0x98,
          type: 0x4155,
          minRemovalDelta: 3,
          minApprovalDelta: 2,
          publicKeyAdditions: [
            '545651E3CEEFCC47A2763B059A95C99C3BE236258811382933340FC324ECEAA9',
            'DA997216C50D4425FB216285FC9110DE1E162E69B36A34DA8FCD8F9ED8980311',
            '110B8B7625A2E2573E5756D33EBCB882EDF7487344AA1CCEFC52E2FCE360AA06',
            '9AE55E3E5BFCDBF39E1DFE7E154C0837FA35CE0B683D85AF8C9ED40A2C07DEF8',
            '598203EDEB7BE359AFEC802E9EDE147230CCA026852EF804BD8864A38EBEAE4B'
          ],
          publicKeyDeletions: []
        }
      })
    })

    // TODO(ahuszagh) Implement...
    it('should parse an aggregate complete transaction', () => {})
    it('should parse an aggregate bonded transaction', () => {})

    it('should parse a hash lock transaction', () => {
      let item = {
        _id: object('5E4C2E0926EC0922222F314F'),
        meta: {
          height: long(8074, 0),
          hash: binary('3AA0833F095F352A94E49043FFC0C328387120474530A8FC957C3B4C6F644980'),
          merkleComponentHash: binary('3AA0833F095F352A94E49043FFC0C328387120474530A8FC957C3B4C6F644980'),
          index: 0,
          addresses: [
            binary('98E0DA79944B614A6CEF698F30B3BA8F36785AB21E9408F08A')
          ]
        },
        transaction: {
          signature: binary('A1B11CD11126E700A563B2BD816A9C201D52294B6D8F5CDB4343DBCC32C27BCD11B09234AFB17BF6067B562DAE58A65E1592E2F8652A68989318D3C17BC3CF01'),
          signerPublicKey: binary('AC332A2998873EDF5DD7B7F9B256B39C8E069E492483FF9D7F8B3580228A2F59'),
          version: 1,
          network: 0x98,
          type: 0x4148,
          maxFee: long(1000000, 0),
          deadline: long(3105455696, 1),
          duration: long(480, 0),
          mosaicId: long(92423592, 1370066984),
          amount: long(10000000, 0),
          hash: binary('A91F6F092E96E0FE9BB2927A2EC8EFAFB4DEFBBC6F6CADB581AF168CD445F6B2')
        }
      }
      expect(mongo.transactions(item)).to.eql({
        meta: {
          height: '8074',
          hash: '3AA0833F095F352A94E49043FFC0C328387120474530A8FC957C3B4C6F644980',
          id: '5E4C2E0926EC0922222F314F',
          merkleComponentHash: '3AA0833F095F352A94E49043FFC0C328387120474530A8FC957C3B4C6F644980',
          index: 0,
          addresses: [
            'TDQNU6MUJNQUU3HPNGHTBM52R43HQWVSD2KAR4EK'
          ]
        },
        transaction: {
          signature: 'A1B11CD11126E700A563B2BD816A9C201D52294B6D8F5CDB4343DBCC32C27BCD11B09234AFB17BF6067B562DAE58A65E1592E2F8652A68989318D3C17BC3CF01',
          signerPublicKey: 'AC332A2998873EDF5DD7B7F9B256B39C8E069E492483FF9D7F8B3580228A2F59',
          version: 1,
          network: 0x98,
          type: 0x4148,
          maxFee: '1000000',
          deadline: '7400422992',
          duration: '480',
          mosaic: {
            mosaicId: '51A99028058245A8',
            amount: '10000000'
          },
          hash: 'A91F6F092E96E0FE9BB2927A2EC8EFAFB4DEFBBC6F6CADB581AF168CD445F6B2'
        }
      })
    })

    it('should parse a secret lock transaction', () => {
      let item = {
        _id: object('5E4C2F4226EC092222318D5D'),
        meta: {
          height: long(29670, 0),
          hash: binary('2A9DC7FF54B67DFFF8DDEDBC60583C8262AED03DF37BA50844C2D411946D2564'),
          merkleComponentHash: binary('2A9DC7FF54B67DFFF8DDEDBC60583C8262AED03DF37BA50844C2D411946D2564'),
          index: 0,
          addresses: [
            binary('98926ECE2C79FB1E02AED4BA0EDE0546D61254BD80380D641B'),
            binary('98F05DC14A7E19799B2E1B47EBEDDD2AEA1D983861606E3C94')
          ]
        },
        transaction: {
          signature: binary('C47DF1746B5C008BD2B984138E395BF1C00B2311623AF3133C36E7698DB31D8129884BC506B06315B129C9EA85B042A69167398FAB9BF183809DCA8A632EBC03'),
          signerPublicKey: binary('5F247764C644A8A0A0E041115547AC8E0CC5F9ECB42C40E75C683C1D13F1E79D'),
          version: 1,
          network: 0x98,
          type: 0x4152,
          maxFee: long(200000, 0),
          deadline: long(3496382849, 1),
          duration: long(1000, 0),
          mosaicId: long(92423592, 1370066984),
          amount: long(1, 0),
          secret: binary('243ED82BCD07D85B7B76B23035268FDCC76079ADC53C76A0A6FCE7E0FC567645'),
          hashAlgorithm: 1,
          recipientAddress: binary('98926ECE2C79FB1E02AED4BA0EDE0546D61254BD80380D641B')
        }
      }
      expect(mongo.transactions(item)).to.eql({
        meta: {
          height: '29670',
          hash: '2A9DC7FF54B67DFFF8DDEDBC60583C8262AED03DF37BA50844C2D411946D2564',
          id: '5E4C2F4226EC092222318D5D',
          merkleComponentHash: '2A9DC7FF54B67DFFF8DDEDBC60583C8262AED03DF37BA50844C2D411946D2564',
          index: 0,
          addresses: [
            'TCJG5TRMPH5R4AVO2S5A5XQFI3LBEVF5QA4A2ZA3',
            'TDYF3QKKPYMXTGZODND6X3O5FLVB3GBYMFQG4PEU'
          ]
        },
        transaction: {
          signature: 'C47DF1746B5C008BD2B984138E395BF1C00B2311623AF3133C36E7698DB31D8129884BC506B06315B129C9EA85B042A69167398FAB9BF183809DCA8A632EBC03',
          signerPublicKey: '5F247764C644A8A0A0E041115547AC8E0CC5F9ECB42C40E75C683C1D13F1E79D',
          version: 1,
          network: 0x98,
          type: 0x4152,
          maxFee: '200000',
          deadline: '7791350145',
          duration: '1000',
          mosaic: {
            mosaicId: '51A99028058245A8',
            amount: '1'
          },
          secret: '243ED82BCD07D85B7B76B23035268FDCC76079ADC53C76A0A6FCE7E0FC567645',
          hashAlgorithm: 1,
          recipientAddress: 'TCJG5TRMPH5R4AVO2S5A5XQFI3LBEVF5QA4A2ZA3'
        }
      })
    })

    it('should parse a secret proof transaction', () => {
      let item = {
        _id: object('5E4C2F4226EC092222318D6B'),
        meta: {
          height: long(29676, 0),
          hash: binary('41F05C35A6E3677CE055A8BD673C00FE82B896AC48A6B2FF843BB05E734B4552'),
          merkleComponentHash: binary('41F05C35A6E3677CE055A8BD673C00FE82B896AC48A6B2FF843BB05E734B4552'),
          index: 0,
          addresses: [
            binary('98926ECE2C79FB1E02AED4BA0EDE0546D61254BD80380D641B')
          ]
        },
        transaction: {
          signature: binary('3F16E213F7EC59CD41E84C24C35EFF8D8A7D22B77036326EA0F9B97D4BE3301B8A5C51980F71120BFC72FDDC1EDBE575BE1F164B5BFB25C3BC4C80B3876B5000'),
          signerPublicKey: binary('0BDDD41AA2AE048EEDB6858423FE336BEFF941EB9D6E968BA00EE24209D6BEC9'),
          version: 1,
          network: 0x98,
          type: 0x4252,
          maxFee: long(200000, 0),
          deadline: long(3496498907, 1),
          secret: binary('243ED82BCD07D85B7B76B23035268FDCC76079ADC53C76A0A6FCE7E0FC567645'),
          hashAlgorithm: 1,
          recipientAddress: binary('98926ECE2C79FB1E02AED4BA0EDE0546D61254BD80380D641B'),
          proof: binary('EC9B04FC1616E32599E591DEB213EF2497847935638F66DFB0A9841460262306')
        }
      }
      expect(mongo.transactions(item)).to.eql({
        meta: {
          height: '29676',
          hash: '41F05C35A6E3677CE055A8BD673C00FE82B896AC48A6B2FF843BB05E734B4552',
          id: '5E4C2F4226EC092222318D6B',
          merkleComponentHash: '41F05C35A6E3677CE055A8BD673C00FE82B896AC48A6B2FF843BB05E734B4552',
          index: 0,
          addresses: [
            'TCJG5TRMPH5R4AVO2S5A5XQFI3LBEVF5QA4A2ZA3'
          ]
        },
        transaction: {
          signature: '3F16E213F7EC59CD41E84C24C35EFF8D8A7D22B77036326EA0F9B97D4BE3301B8A5C51980F71120BFC72FDDC1EDBE575BE1F164B5BFB25C3BC4C80B3876B5000',
          signerPublicKey: '0BDDD41AA2AE048EEDB6858423FE336BEFF941EB9D6E968BA00EE24209D6BEC9',
          version: 1,
          network: 0x98,
          type: 0x4252,
          maxFee: '200000',
          deadline: '7791466203',
          secret: '243ED82BCD07D85B7B76B23035268FDCC76079ADC53C76A0A6FCE7E0FC567645',
          hashAlgorithm: 1,
          recipientAddress: 'TCJG5TRMPH5R4AVO2S5A5XQFI3LBEVF5QA4A2ZA3',
          proof: 'EC9B04FC1616E32599E591DEB213EF2497847935638F66DFB0A9841460262306'
        }
      })
    })

    // TODO(ahuszagh) Implement...
    it('should parse an account restriction address transaction', () => {})
    it('should parse an account restriction mosaic transaction', () => {})
    it('should parse an account restriction operation transaction', () => {})
    it('should parse a link account transaction', () => {})
    it('should parse a mosaic address restriction transaction', () => {})
    it('should parse a mosaic global restriction transaction', () => {})
    it('should parse an account metadata transaction', () => {})
    it('should parse a mosaic metadata transaction', () => {})
    it('should parse a namespace metadata transaction', () => {})
  })

  // TODO(ahuszagh) Implement...
  describe('unconfirmedTransactions', () => {})
})
