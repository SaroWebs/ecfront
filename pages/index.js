import CategoriesListCompo from '@/components/CategoriesListCompo';
import BannerCard from '@/components/home/BannerCard';
import SliderMain from '@/components/home/SliderMain';
import FeaturedProducts from '@/components/products/FeaturedProducts';
import TopProducts from '@/components/products/TopProducts';
import { AuthLayout } from '@/layout/AuthLayout';

const Index = () => {

  return (
    <AuthLayout>
      <div className='mb-16'>
        <SliderMain />
        <CategoriesListCompo />
        <TopProducts show={4} />
        <BannerCard
          item={{
            image: '/core-images/sliders/121525.png',
            header: 'Easy Return',
            className:'bg-blue-800/75',
            description: '',
            link: {
              buttonText: 'Explore',
              active: false,
              url: '#'
            }
          }}
        />
        <FeaturedProducts show={4} />
        <BannerCard
          item={{
            image: '',
            className:'bg-red-800',
            header: 'Get 20% discount',
            description: 'To get discount enter GET20 code on checkout page',
            link: {
              buttonText: 'Explore',
              active: false,
              url: '#'
            }
          }}
        />

      </div>
    </AuthLayout>
  );
};

export default Index;
