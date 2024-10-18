/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  FlexWidget,
  IconWidget,
  ListWidget,
  TextWidget,
} from 'react-native-android-widget';
// import {NewsApi} from '../apis';

export function ResizableMusicWidget({archivedIndex = 1}) {
  // const [newsData, setNewsData] = useState([]);
  // const {userData} = userInfo();

  let aiNews;
  // const getMyNews = async (pages = 2) => {
  //   try {
  //     let config = {
  //       method: 'get',
  //       url: NewsApi,
  //       headers: {
  //         'x-pagination-page': 1,
  //         'x-pagination-limit': '10',
  //         Authorization:
  //           'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzM4YWUxMDA3YjY4MTMzZGNmNjljNSIsImlhdCI6MTcxNDY1MzkyMSwiZXhwIjo3NzE0NjUzOTIxfQ.4Osv9zrcx-JH2lHD7VC-Icj_ookad6Lomxd7fgSJ8RA',
  //       },
  //     };
  //     const resp = await axios.request(config);
  //     // console.log('error resp :', resp.data.docs);
  //     if (resp.data.docs) {
  //       aiNews = resp.data.docs;

  //       return resp.data.docs;
  //     }
  //   } catch (error) {
  //     console.log('error ', error);
  //   }
  // };

  // const data = async () => {
  //   const value = await getMyNews();
  //   console.log('get News : ', value.length);
  //   return value;
  // };
  // const aiNewsData = data();

  // useEffect(() => {
  // }, []);

  // console.log(aiNews, 'news Response10388 aiNews1 : \n : ', aiNewsData);

  const newsData = [
    {
      _id: '6674064e80a34ee982c93213',
      body: 'بھارت میں گرمی کے باعث ایک ہفتے میں 200 بے گھر افراد ہلاک  ہوگئے۔ ٹآف انڈیا کی رپورٹ کے مطابق گزشتہ دو دنوں میں 52 لاشیں ہسپتالوں میں لائی گئیں، انہوں نے  مزید کہا کہ ان میں سے زیادہ تر غریب لوگ تھے جو کھلے میں رہتے اور کام کرتے تھے۔ یم سینٹر فار ہولیسٹک ڈویلپمنٹ کے اشتراک کردہ سرکاری اعداد و شمار کے مطابق نئی دہلی میں 11  ہوئی ہے، جب شمال مغربی اور مشرقی ہندوستان میں ہیٹ ویو کے دنوں کی معمول کی تعداد سے دوگنا زیادہ ریکارڈ کیا گیا تھا۔',
      category: 'تازہ ترین خبر',
      categoryId: '6540937104da1f854bef3f76',
      commentCount: 0,
      isBreakingNews: true,
      isLiked: false,
      isRead: false,
      isSaved: false,
      likeCount: 0,
      link: 'https://www.aaj.tv/news/30392908/',
      logo: 'https://pencil-app-resources.s3.ap-southeast-1.amazonaws.com/news-source-logos/aj-news-logo.png',
      newssource: [Object],
      publishDate: '2024-06-20T10:36:00.000Z',
      readCount: 0,
      source: 'آج نیوز',
      thumbnail:
        'https://i.aaj.tv/medium/2024/06/2015354449e881b.webp?r=153607',
      title: 'بھارت میں ہیٹ اسٹروک سے 7 روز میں 200 بے گھر افراد ہلاک',
    },
    {
      _id: '6674064f80a34ee982c93214',
      body: 'تازہ کڑی پتوں کو طویل عرصے تک ذخیرہ کرنے کا طریقہ دکھانے والی ایک ویڈیو سوشل میڈیا پر وائرل ہوگئی ہے ، جسے 7 ملین سے زیادہ بار دیکھا جا چکاہے ل ویڈیو میں 6 ماہ تک تازہ کری پتے ذخیرہ کرنے کا آسان طریقہ دکھایا گیا۔ ں بتایا گیا ہے کہ کس طرح آپ کڑی پتے کو 6 ماہ تک تازہ رکھ سکتے ہ تازہ جڑی بوٹیوں کو طویل عرصے تک ذخیرہ کرنا مشکل ہے کیونکہ یہ خشک ہو سکتے ہیں اور آسانی سے بھورے ہو سکتے ہیں۔ ہ انہیں ریفریجر کڑی پتوں کو طویل عرصے تک تازہ رکھنے میں مدد کرے گا اور خاص طور پر اس وقت کام آئے گا، جب آپ سردیوں میں تازہ کڑی پتے استعمال کرنا چاہتے ہیں۔۔ “ ایک اور صارف نے لکھا کہ ’واہ! کیا شاندار ہیک ہے',
      category: 'تازہ ترین خبر',
      categoryId: '6540937104da1f854bef3f76',
      commentCount: 0,
      isBreakingNews: true,
      isLiked: false,
      isRead: false,
      isSaved: false,
      likeCount: 0,
      link: 'https://www.aaj.tv/news/30392903/',
      logo: 'https://pencil-app-resources.s3.ap-southeast-1.amazonaws.com/news-source-logos/aj-news-logo.png',
      newssource: [Object],
      publishDate: '2024-06-20T10:26:00.000Z',
      readCount: 0,
      source: 'آج نیوز',
      thumbnail:
        'https://i.aaj.tv/medium/2024/06/20152118a5c929c.webp?r=152125',
      title: '6 ماہ تک کڑی پتے کیسے محف کئے جائیں، ویڈیو وائرل',
    },
    {
      _id: '6674065080a34ee982c93215',
      body: 'کوئٹہ کے نواحی علاقے میں پکنک پوائنٹ سے مسلح افراد نے آٹھ افراد کواغوا کرلیا، مغویوں میں ایک کسٹم اہلکار اور پنجاب  ے 6 رہائشی افراد شامل ہیں لیویز ذرائع کے مطابق کوئٹہ کے قریب شعبان کے پہاڑی علاقے سے عید پر پکنک منانے کے لیے آنے والے   افراد کو اغواء کر لیا گیا۔ 0 سے 40 مسلح افراد پہاڑوں سے اتر کر نیچے آے اور آبشار کے قریب بیٹھے لوگوں سے فون اور شناختی ',
      category: 'تازہ ترین خبر',
      categoryId: '6540937104da1f854bef3f76',
      commentCount: 0,
      isBreakingNews: true,
      isLiked: false,
      isRead: false,
      isSaved: false,
      likeCount: 0,
      link: 'https: //www.aaj.tv/news/30392904/',
      logo: 'https://pencil-app-resources.s3.ap-southeast-1.amazonaws.com/news-source-logos/aj-news-logo.png',
      newssource: [Object],
      publishDate: '2024-06-20T10:24:00.000Z',
      readCount: 0,
      source: 'آج نیوز',
      thumbnail: 'https://i.aaj.tv/medium/2024/06/20152354d38c28f.jpg?r=152408',
      title: 'کوئٹہ میں پکنک پوائنٹ سے مسلح افراد نے 8 افراد کو اغواء کرلیا',
    },
    {
      _id: '667407f180a34ee982c93222',
      body: 'مئی 2024 میں بجلی کی پیداوار آٹھ ماہ میں سالانہ بنیادوں پر اضافے کی پہلی ماہانہ ریکارڈنگ تھی  کیونکہ گرڈ کی پیداوار 12.2 بلین یونٹ تھی جو ایک سال پہلے کے مقابلے میں 2.2 فیصد زیادہ ہوگئی۔ ایک اعلیٰ درجے  ا امید پرست ہی اسے قسمت میں کسی بھی قسم کی تبدیلی کے طور پر دیکھ سکتا ہے تاہم سیاق و سباق یہاں کچھ مدد گار ثابت ہورہے ہیں۔ محکمہ موسمیات کے مطابق مئی 2024 کم از کم 60 سال کی ریکارڈ شدہ تاریخ میں سب سے خشک اور گرم ترین مہینہ تھا۔ گزشتہ سال کے مقابلے میں اوسط درجہ حرارت میں 8 فیصد اور دن کے زیادہ سے زیادہ درجہ حرارت میں 12 فیصد اضافہ ہوا ہے۔ اس تناظر میں سالانہ بنیاد پر 2 فیصد اضافہ زیادہ اعتماد پیدا نہیں کرتا۔کی جانے والی پیداوار 6.5 ارب یونٹس ہے جو مالی سال 24 کے 16.5 ارب یونٹس کے مقابلے میں زمینی حقائق سے کہیں زیادہ ہے۔ باقی سب کچھ مستقل ہے، ایک بہت بہتر جنریشن فیول مکس مفروضہ مالی سال 25 میں مثبت ماہانہ ایڈجسٹمنٹ کی فریکوئنسی اور شدت کو کم کرے گا۔ ایک بہت بہتر جنریشن فیول مکس مفروضہ مالی سال 25 میں مثبت ماہانہ ایڈجسٹمنٹ کی فریکوئنسی اور شدت کو کم کرے گا.',
      category: 'سائنس اور ٹیکنالوجی',
      categoryId: '6540937204da1f854bef3f7f',
      commentCount: 0,
      isBreakingNews: true,
      isLiked: false,
      isRead: false,
      isSaved: false,
      likeCount: 0,
      link: 'https: //urdu.brecorder.com/news/40263703',
      logo: 'https://i.brecorder.com/thumbnail/2022/09/6311d2877b06a.png',
      newssource: [Object],
      publishDate: '2024-06-20T10:12:33.000Z',
      readCount: 0,
      source: 'بی آر نیوز',
      thumbnail:
        'https://i.brecorder.com/thumbnail/2024/06/201455446c19760.gif?r=145644',
      title: 'فیول ایڈجسٹمنٹ: بہتر مالی سال 2025 پر نظر',
    },
    {
      _id: '6673fe5680a34ee982c931f6',
      body: 'لاہور( ڈیلی پاکستان آن لائن )پنجاب میں حکومت اور گورننس  نظام میں انقلابی تبدیلی کا انقلابی فیصلہ  کر لیاگیا ۔وزیر اعلی پنجاب مریم نواز  نے 14 رکنی خصوصی اعلیٰ سطح کمیٹی قائم کر دی جسے 60 دن میں سفارشات کی تیاری کا ٹاسک  دیا گیا ہ تفصیلات کے مطابق پنجاب میں وزارتوں اور محکموں کی تاریخ کی سب سے بڑی ری سٹرکچرنگ کا فیصلہ  کیا ہے ،فالتو، نکمے اور خساروں کے شکار اداروں کی ڈاﺅن سائزنگ کی جائے گی ،وزارتوں کا حجم کم کرکے اور تیز بنایاجائے گا ،ری سٹرکچرنگ اور ڈاﺅن سائزنگ سے اربوں روپے کی بچت ہوگی  اور حکومت کے سالانہ اخراجات میں بڑی کمی ہونے سے مالی گنجائش پیدا ہوگی۔',
      category: 'قومی',
      categoryId: '6540937004da1f854bef3f71',
      commentCount: 0,
      isBreakingNews: false,
      isLiked: false,
      isRead: false,
      isSaved: false,
      likeCount: 0,
      link: 'https: //dailypakistan.com.pk/20-Jun-2024/1724672',
      logo: 'https://pencil-app-resources.s3.ap-southeast-1.amazonaws.com/news-source-logos/daily-pakistan.png',
      newssource: [Object],
      publishDate: '2024-06-20T09:58:24.000Z',
      readCount: 0,
      source: 'روزنامہ پاکستان',
      thumbnail:
        'https://dailypakistan.com.pk/digital_images/extra-large/2024-06-20/news-1718877492-7817.jpg',
      title:
        'پنجاب میں حکومت اور گورننس کے نظام میں انقلابی تبدیلی کا  فیصلہ ،فالتو اور خساروں کے شکار اداروں کی  "باری " آ گئی',
    },
    {
      _id: '6674065180a34ee982c93216',
      body: 'فرانسیسی صحافی نے انکشاف کیا ہے کہ انہوں نے 13 برس سے زائد عرصے کے بعد بھارت چھوڑ دیا تھا کیونکہ انہیں ورک پرمٹ دینے سے انکار کر دیا گیا تھا، اس فیصلے کو انہوں نے ”ناقابل فہم سنسرشپ“ کا عمل قرار دی ٹی آر ٹی کی رپورٹ کے مطابق ناقدین کا کہنا ہے کہ بھارت میں میڈیا کی آزادی پر تیزی سے حملے ہو رہے ہیں، حساس موضوعات پر بات کرنے والے صحافیوں کو اکثر حکومتی سرزنش کا نشانہ بنایا جاتا ہے۔    وں آسٹریلوی اے بی سی کے صحافی آوانی ڈیاس نے کہا کہ انہیں مؤثر طریقے سے بے دخل کیا گیا، انہیں بتایا گیا کہ ان کے صحافی کے ویزا میں توسیع سے انکار کر دیا جائے گا۔',
      category: 'تازہ ترین خبر',
      categoryId: '6540937104da1f854bef3f76',
      commentCount: 0,
      isBreakingNews: true,
      isLiked: false,
      isRead: false,
      isSaved: false,
      likeCount: 0,
      link: 'https://www.aaj.tv/news/30392899/',
      logo: 'https://pencil-app-resources.s3.ap-southeast-1.amazonaws.com/news-source-logos/aj-news-logo.png',
      newssource: [Object],
      publishDate: '2024-06-20T09:54:00.000Z',
      readCount: 0,
      source: 'آج نیوز',
      thumbnail: 'https://i.aaj.tv/medium/2024/06/20145230d2fe5c1.png?r=145448',
      title:
        'ورک پرمٹ میں توسیع سے انکار، بھارت نے فرانسیسی صحافی کو ملک سے نکل جانے پر مجبور کردیا',
    },
  ];
  function CollectionData({archivedIndex}) {
    return (
      <ListWidget
        style={{
          height: 'match_parent',
          width: 'match_parent',
          backgroundColor: '#1F3529',
        }}>
        {newsData.map(item => (
          <FlexWidget
            style={{
              width: 'match_parent',
              alignItems: 'center',
              flexDirection: 'row',
            }}
            // p1
            key={item._id}
            clickAction="OPEN_URI"
            clickActionData={{
              uri: `foodizone://list/list-demo/${item._id}`,
              // uri: `pencilnews://list/list-demo/${item._id}`,
              // uri: `androidwidgetexample://list/list-demo/${item._id}`,
            }}>
            <FlexWidget
              style={{
                width: 'match_parent',
                backgroundColor: '#4D6357',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 4,
                paddingHorizontal: 8,
                marginVertical: 4,
                borderRadius: 16,
              }}>
              <FlexWidget
                style={{
                  flexDirection: 'column',
                }}>
                <TextWidget
                  text={item.category}
                  style={{
                    fontSize: 16,
                    color: '#ffffff',
                    fontWeight: '500',
                    fontFamily: 'Roboto',
                  }}
                />
                <TextWidget
                  text={item.body}
                  style={{
                    fontSize: 12,
                    color: '#ffffff',
                    fontFamily: 'Roboto',
                  }}
                />
                <TextWidget
                  text={item.publishDate}
                  style={{
                    fontSize: 12,
                    color: '#ffffff',
                    fontFamily: 'Roboto',
                  }}
                />
              </FlexWidget>
              <IconWidget
                // icon={archivedIndex === i ? 'unarchive' : 'archive'}
                icon={'archive'}
                size={24}
                // font={archivedIndex === i ? 'material' : 'material_outlined'}
                font={'material_outlined'}
                style={{color: '#fff'}}
                clickAction="ARCHIVE"
                // clickActionData={{listItemId: item}}
              />
            </FlexWidget>
          </FlexWidget>
        ))}

        <FlexWidget
          style={{
            width: 'match_parent',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            paddingTop: 16,
            paddingBottom: 24,
          }}
          clickAction="OPEN_URI"
          clickActionData={{
            uri: 'androidwidgetexample://list/list-demo',
          }}>
          <TextWidget text="View more" style={{fontSize: 14, color: '#fff'}} />
        </FlexWidget>
      </ListWidget>
    );
  }
  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: '#1F3529',
        flexDirection: 'column',
        paddingHorizontal: 16,
        paddingTop: 16,
        borderRadius: 16,
      }}>
      <FlexWidget
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: 'match_parent',
          marginBottom: 16,
        }}>
        <TextWidget
          text="Inbox (2)"
          style={{
            fontSize: 16,
            fontWeight: '500',
            color: '#fff',
          }}
        />
        <IconWidget
          icon="edit"
          size={20}
          clickAction="COMPOSE"
          font="material_outlined"
          style={{
            color: '#000',
            backgroundColor: '#AAF2CC',
            padding: 8,
            borderRadius: 12,
          }}
        />
      </FlexWidget>

      <CollectionData archivedIndex={archivedIndex} />
    </FlexWidget>
  );
}
